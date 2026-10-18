package com.gymapp

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule

class NativeHapticsModule(context: Context) : LynxModule(context) {
    private val vibrator: Vibrator? by lazy {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            (mContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager)?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            mContext.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        }
    }

    @LynxMethod
    fun trigger(kind: String) {
        val v = vibrator ?: return
        if (!v.hasVibrator()) return
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            v.vibrate(effectFor(kind))
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createOneShot(durationFor(kind), VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            v.vibrate(durationFor(kind))
        }
    }

    private fun effectFor(kind: String): VibrationEffect = when (kind) {
        "selection" -> VibrationEffect.createPredefined(VibrationEffect.EFFECT_TICK)
        "medium" -> VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK)
        "heavy" -> VibrationEffect.createPredefined(VibrationEffect.EFFECT_HEAVY_CLICK)
        "success" -> VibrationEffect.createWaveform(longArrayOf(0, 18, 70, 28), intArrayOf(0, 140, 0, 255), -1)
        "warning" -> VibrationEffect.createPredefined(VibrationEffect.EFFECT_DOUBLE_CLICK)
        "error" -> VibrationEffect.createWaveform(longArrayOf(0, 30, 60, 30, 60, 30), intArrayOf(0, 255, 0, 255, 0, 255), -1)
        else -> VibrationEffect.createPredefined(VibrationEffect.EFFECT_TICK)
    }

    private fun durationFor(kind: String): Long = when (kind) {
        "selection", "light" -> 10L
        "medium" -> 20L
        "heavy", "warning" -> 35L
        else -> 40L
    }
}
