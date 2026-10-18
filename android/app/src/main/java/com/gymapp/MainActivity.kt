package com.gymapp

import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.ApplicationInfo
import android.os.Bundle
import android.widget.FrameLayout
import androidx.core.content.ContextCompat
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.LynxViewClient

class MainActivity : Activity() {
    private lateinit var container: FrameLayout
    private val isDebug get() = applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0

    private val reloadReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) = render()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        container = FrameLayout(this).apply { setBackgroundColor(getColor(R.color.bg)) }
        setContentView(container)
        render()
        if (isDebug) {
            ContextCompat.registerReceiver(
                this, reloadReceiver, IntentFilter(RELOAD_ACTION), ContextCompat.RECEIVER_EXPORTED
            )
        }
    }

    override fun onDestroy() {
        if (isDebug) unregisterReceiver(reloadReceiver)
        for (i in 0 until container.childCount) (container.getChildAt(i) as? LynxView)?.destroy()
        super.onDestroy()
    }

    // Render the new view underneath the current one and swap only after its first frame, so reloads never flash.
    private fun render() {
        val next = LynxViewBuilder()
            .setTemplateProvider(AssetTemplateProvider(this))
            .build(this)
        next.setBackgroundColor(getColor(R.color.bg))
        next.addLynxViewClient(object : LynxViewClient() {
            override fun onFirstScreen() {
                runOnUiThread {
                    for (i in container.childCount - 1 downTo 0) {
                        val child = container.getChildAt(i)
                        if (child !== next) {
                            container.removeViewAt(i)
                            (child as? LynxView)?.destroy()
                        }
                    }
                }
            }
        })
        container.addView(next, 0)
        next.renderTemplateUrl(if (isDebug) DEV_BUNDLE_URL else "main.lynx.bundle", "")
    }

    companion object {
        const val RELOAD_ACTION = "com.gymapp.RELOAD"
        const val DEV_BUNDLE_URL = "http://localhost:3000/main.lynx.bundle"
    }
}
