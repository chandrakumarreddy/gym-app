package com.gymapp

import android.content.Context
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule

class NativeLocalStorageModule(context: Context) : LynxModule(context) {
    private val prefs get() = mContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    @LynxMethod
    fun getStorageItem(key: String): String? = prefs.getString(key, null)

    @LynxMethod
    fun setStorageItem(key: String, value: String) {
        prefs.edit().putString(key, value).apply()
    }

    @LynxMethod
    fun removeStorageItem(key: String) {
        prefs.edit().remove(key).apply()
    }

    companion object {
        private const val PREFS_NAME = "fitcue"
    }
}
