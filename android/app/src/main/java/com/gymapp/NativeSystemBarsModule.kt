package com.gymapp

import android.content.Context
import android.content.ContextWrapper
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule

class NativeSystemBarsModule(context: Context) : LynxModule(context) {
    @LynxMethod
    fun setFullBleed(fullBleed: Boolean) {
        activity()?.setFullBleed(fullBleed)
    }

    @LynxMethod
    fun appReady() {
        activity()?.onAppReady()
    }

    private fun activity(): MainActivity? {
        var ctx: Context? = mContext
        while (ctx is ContextWrapper) {
            if (ctx is MainActivity) return ctx
            ctx = ctx.baseContext
        }
        return null
    }
}
