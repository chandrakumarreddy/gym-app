package com.gymapp

import android.content.Context
import com.lynx.tasm.provider.AbsTemplateProvider
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

class AssetTemplateProvider(context: Context) : AbsTemplateProvider() {
    private val appContext = context.applicationContext
    private val http = OkHttpClient()

    override fun loadTemplate(uri: String, callback: Callback) {
        Thread {
            try {
                // Remote bundles are only for the debug dev server; release loads packaged assets only.
                if (BuildConfig.DEBUG && (uri.startsWith("http://") || uri.startsWith("https://"))) {
                    http.newCall(Request.Builder().url(uri).build()).execute().use {
                        if (!it.isSuccessful) throw IOException("HTTP ${it.code} for $uri")
                        callback.onSuccess(it.body!!.bytes())
                    }
                } else {
                    appContext.assets.open(uri).use { callback.onSuccess(it.readBytes()) }
                }
            } catch (e: IOException) {
                callback.onFailed(e.message)
            }
        }.start()
    }
}
