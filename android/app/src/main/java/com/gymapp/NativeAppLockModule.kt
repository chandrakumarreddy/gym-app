package com.gymapp

import android.app.KeyguardManager
import android.content.Context
import android.content.ContextWrapper
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule
import com.lynx.react.bridge.Callback

class NativeAppLockModule(context: Context) : LynxModule(context) {
    @LynxMethod
    fun isAvailable(): Boolean = isAvailable(mContext)

    @LynxMethod
    fun isEnabled(): Boolean = isEnabled(mContext)

    // Turning the lock on or off needs the fingerprint or screen lock first.
    @LynxMethod
    fun setEnabled(enabled: Boolean, callback: Callback) {
        val activity = activity() ?: return callback.invoke(false)
        activity.authenticate { ok ->
            if (ok) prefs(mContext).edit().putBoolean(KEY_ENABLED, enabled).apply()
            callback.invoke(ok)
        }
    }

    private fun activity(): MainActivity? {
        var ctx: Context? = mContext
        while (ctx is ContextWrapper) {
            if (ctx is MainActivity) return ctx
            ctx = ctx.baseContext
        }
        return null
    }

    companion object {
        private const val PREFS_NAME = "fitcue.appLock"
        private const val KEY_ENABLED = "enabled"

        private fun prefs(context: Context) = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        // The phone has a PIN, pattern or password, so fingerprint and screen-lock checks can work.
        fun isAvailable(context: Context): Boolean =
            context.getSystemService(KeyguardManager::class.java)?.isDeviceSecure == true

        fun isEnabled(context: Context): Boolean = prefs(context).getBoolean(KEY_ENABLED, false)
    }
}
