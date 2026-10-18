package com.gymapp

import android.app.Application
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.core.ImagePipelineConfig
import com.facebook.imagepipeline.memory.PoolConfig
import com.facebook.imagepipeline.memory.PoolFactory
import com.lynx.service.http.LynxHttpService
import com.lynx.service.image.LynxImageService
import com.lynx.service.log.LynxLogService
import com.lynx.tasm.LynxEnv
import com.lynx.tasm.service.LynxServiceCenter

class GymApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val factory = PoolFactory(PoolConfig.newBuilder().build())
        Fresco.initialize(
            applicationContext,
            ImagePipelineConfig.newBuilder(applicationContext).setPoolFactory(factory).build()
        )

        LynxServiceCenter.inst().registerService(LynxImageService.getInstance())
        LynxServiceCenter.inst().registerService(LynxLogService)
        LynxServiceCenter.inst().registerService(LynxHttpService)

        LynxEnv.inst().init(this, null, null, null)
        LynxEnv.inst().registerModule("NativeLocalStorageModule", NativeLocalStorageModule::class.java)
        LynxEnv.inst().registerModule("NativeSystemBarsModule", NativeSystemBarsModule::class.java)
    }
}
