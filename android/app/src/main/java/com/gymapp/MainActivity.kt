package com.gymapp

import android.Manifest
import android.app.Activity
import android.app.KeyguardManager
import android.hardware.biometrics.BiometricPrompt
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.os.Build
import android.graphics.drawable.Animatable
import android.os.Bundle
import android.os.CancellationSignal
import android.os.SystemClock
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.widget.LinearLayout
import android.widget.TextView
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
    // Covers the app while the app lock is waiting for the fingerprint or screen lock.
    private var lockCover: View? = null
    private var authenticating = false
    private var pendingAuth: ((Boolean) -> Unit)? = null
    private var backgroundAt = 0L

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

    // Lock on launch and when coming back after RELOCK_MS in the background.
    override fun onStart() {
        super.onStart()
        val away = backgroundAt == 0L || SystemClock.elapsedRealtime() - backgroundAt >= RELOCK_MS
        if (away && !authenticating && NativeAppLockModule.isEnabled(this) && NativeAppLockModule.isAvailable(this)) lock()
    }

    override fun onResume() {
        super.onResume()
        if (lockCover != null && !authenticating) container.post(::unlock)
    }

    override fun onStop() {
        if (!isChangingConfigurations && !authenticating) backgroundAt = SystemClock.elapsedRealtime()
        super.onStop()
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode != REQUEST_UNLOCK) return
        val done = pendingAuth
        pendingAuth = null
        done?.invoke(resultCode == RESULT_OK)
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

    // Ask for the fingerprint, falling back to the phone's PIN, pattern or password.
    fun authenticate(onResult: (Boolean) -> Unit) = runOnUiThread {
        if (authenticating) return@runOnUiThread onResult(false)
        authenticating = true
        val done = { ok: Boolean ->
            authenticating = false
            onResult(ok)
        }
        val title = getString(R.string.app_lock_title)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val builder = BiometricPrompt.Builder(this).setTitle(title)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                builder.setAllowedAuthenticators(
                    android.hardware.biometrics.BiometricManager.Authenticators.BIOMETRIC_WEAK or
                        android.hardware.biometrics.BiometricManager.Authenticators.DEVICE_CREDENTIAL
                )
            } else {
                @Suppress("DEPRECATION")
                builder.setDeviceCredentialAllowed(true)
            }
            builder.build().authenticate(CancellationSignal(), mainExecutor, object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult?) = done(true)
                override fun onAuthenticationError(errorCode: Int, errString: CharSequence?) = done(false)
            })
        } else {
            @Suppress("DEPRECATION")
            val intent = getSystemService(KeyguardManager::class.java)?.createConfirmDeviceCredentialIntent(title, null)
            if (intent == null) return@runOnUiThread done(false)
            pendingAuth = done
            @Suppress("DEPRECATION")
            startActivityForResult(intent, REQUEST_UNLOCK)
        }
    }

    private fun lock() {
        if (lockCover != null) return
        val density = resources.displayMetrics.density
        val icon = ImageView(this).apply { setImageDrawable(getDrawable(R.drawable.splash_icon_vector)) }
        val title = TextView(this).apply {
            text = getString(R.string.app_lock_title)
            textSize = 20f
            setTextColor(getColor(R.color.text))
            gravity = Gravity.CENTER
        }
        val unlock = TextView(this).apply {
            text = getString(R.string.app_lock_unlock)
            textSize = 16f
            setTextColor(getColor(R.color.ember))
            gravity = Gravity.CENTER
            val pad = (16 * density).toInt()
            setPadding(pad, pad, pad, pad)
            setOnClickListener { unlock() }
        }
        val column = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            val size = (SPLASH_ICON_DP / 2 * density).toInt()
            addView(icon, LinearLayout.LayoutParams(size, size))
            addView(title)
            addView(unlock)
        }
        lockCover = FrameLayout(this).apply {
            setBackgroundColor(getColor(R.color.bg))
            isClickable = true
            addView(column, FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.CENTER))
        }
        container.addView(lockCover)
    }

    private fun unlock() {
        if (lockCover == null) return
        authenticate { ok ->
            if (!ok) return@authenticate
            container.removeView(lockCover)
            lockCover = null
        }
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
        const val RELOCK_MS = 60_000L
        const val REQUEST_UNLOCK = 1
        const val RELOAD_ACTION = "com.gymapp.RELOAD"
        const val DEV_BUNDLE_URL = "http://localhost:3000/main.lynx.bundle"
    }
}
