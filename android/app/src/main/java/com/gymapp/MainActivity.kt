package com.gymapp

import android.Manifest
import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.os.Build
import android.graphics.drawable.Animatable
import android.os.Bundle
import android.os.SystemClock
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.view.animation.AccelerateInterpolator
import android.widget.FrameLayout
import android.widget.ImageView
import androidx.core.animation.doOnEnd
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.lynx.tasm.LynxError
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.LynxViewClient

class MainActivity : Activity() {
    private lateinit var container: FrameLayout
    private var firstScreenShown = false
    // Splash and Welcome are full screen; JS decides per route once the first screen is up.
    private var fullBleed = true
    private var splash: FrameLayout? = null
    // The rendered view waiting for JS to pick its start route before it's revealed.
    private var pending: LynxView? = null
    private var splashIconDoneAt = 0L

    private val reloadReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) = render()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            window.attributes = window.attributes.apply {
                layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
            }
        }
        // Status bar painted in --ember on every screen.
        @Suppress("DEPRECATION")
        window.statusBarColor = getColor(R.color.ember)
        applyStatusBar()
        // The system splash is a plain bg frame; drop it instantly so our splash (hero + icon) shows as one.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            splashScreen.setOnExitAnimationListener { it.remove() }
        }
        container = FrameLayout(this).apply { setBackgroundColor(getColor(R.color.bg)) }
        setContentView(container)
        showSplash()
        render()
        if (BuildConfig.DEBUG) {
            // Exported so `adb shell am broadcast` reaches it; DUMP is held by shell but not by third-party apps.
            ContextCompat.registerReceiver(
                this, reloadReceiver, IntentFilter(RELOAD_ACTION), Manifest.permission.DUMP, null,
                ContextCompat.RECEIVER_EXPORTED
            )
        }
    }

    override fun onDestroy() {
        if (BuildConfig.DEBUG) unregisterReceiver(reloadReceiver)
        for (i in 0 until container.childCount) (container.getChildAt(i) as? LynxView)?.destroy()
        super.onDestroy()
    }

    // JS has rendered its real first route (the main-thread first screen can't read storage yet).
    fun onAppReady() = runOnUiThread { pending?.let(::reveal) }

    fun setFullBleed(value: Boolean) = runOnUiThread {
        fullBleed = value
        if (firstScreenShown) applyStatusBar()
    }

    private fun applyStatusBar() {
        val controller = WindowCompat.getInsetsController(window, window.decorView)
        controller.isAppearanceLightStatusBars = false
        if (fullBleed) {
            controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            controller.hide(WindowInsetsCompat.Type.statusBars())
        } else {
            window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
            controller.show(WindowInsetsCompat.Type.statusBars())
        }
    }

    // Hero background and animated icon on top of the Lynx view until its first screen is painted.
    private fun showSplash() {
        val icon = ImageView(this).apply {
            setImageDrawable(getDrawable(R.drawable.splash_icon_animated))
            (drawable as? Animatable)?.start()
        }
        val size = (SPLASH_ICON_DP * resources.displayMetrics.density).toInt()
        splash = FrameLayout(this).apply {
            background = getDrawable(R.drawable.splash_hero)
            addView(icon, FrameLayout.LayoutParams(size, size, Gravity.CENTER))
        }
        container.addView(splash)
        splashIconDoneAt = SystemClock.uptimeMillis() + SPLASH_ICON_MS
    }

    // Let the icon animation finish, then zoom the icon and fade the splash into the first screen.
    private fun hideSplash() {
        val view = splash ?: return
        splash = null
        val icon = view.getChildAt(0)
        AnimatorSet().apply {
            playTogether(
                ObjectAnimator.ofFloat(icon, View.SCALE_X, 1f, 1.6f),
                ObjectAnimator.ofFloat(icon, View.SCALE_Y, 1f, 1.6f),
                ObjectAnimator.ofFloat(view, View.ALPHA, 1f, 0f),
            )
            startDelay = (splashIconDoneAt - SystemClock.uptimeMillis()).coerceAtLeast(0)
            duration = 320
            interpolator = AccelerateInterpolator()
            doOnEnd { container.removeView(view) }
            start()
        }
    }

    // Render the new view underneath the current one and swap only once JS is ready, so reloads never flash.
    private fun render() {
        val next = LynxViewBuilder()
            .setTemplateProvider(AssetTemplateProvider(this))
            .build(this)
        next.setBackgroundColor(getColor(R.color.bg))
        next.addLynxViewClient(object : LynxViewClient() {
            override fun onReceivedError(error: LynxError?) {
                runOnUiThread { reveal(next) }
            }

            override fun onFirstScreen() {
                runOnUiThread { container.postDelayed({ reveal(next) }, READY_TIMEOUT_MS) }
            }
        })
        pending = next
        container.addView(next, 0)
        next.renderTemplateUrl(if (BuildConfig.DEBUG) DEV_BUNDLE_URL else "main.lynx.bundle", "")
    }

    // Hide the splash and drop the views this one replaces.
    private fun reveal(view: LynxView) {
        if (pending !== view) return
        pending = null
        firstScreenShown = true
        applyStatusBar()
        hideSplash()
        for (i in container.childCount - 1 downTo 0) {
            val child = container.getChildAt(i)
            if (child is LynxView && child !== view) {
                container.removeViewAt(i)
                child.destroy()
            }
        }
    }

    companion object {
        const val SPLASH_ICON_DP = 288
        const val SPLASH_ICON_MS = 1000L
        const val READY_TIMEOUT_MS = 3000L
        const val RELOAD_ACTION = "com.gymapp.RELOAD"
        const val DEV_BUNDLE_URL = "http://localhost:3000/main.lynx.bundle"
    }
}
