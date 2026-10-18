plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)
}

val lynxDist = rootProject.file("../dist")
val lynxAssetsDir = layout.buildDirectory.dir("generated/lynx/assets").get().asFile

val syncLynxBundle by tasks.registering(Sync::class) {
    doFirst {
        check(lynxDist.resolve("main.lynx.bundle").exists()) {
            "${lynxDist}/main.lynx.bundle not found. Run 'bun run build' first."
        }
    }
    from(lynxDist) { include("*.lynx.bundle") }
    into(lynxAssetsDir)
}

android {
    namespace = "com.gymapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.gymapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildFeatures {
        buildConfig = true
    }

    sourceSets["main"].assets.srcDir(lynxAssetsDir)

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

tasks.named("preBuild") { dependsOn(syncLynxBundle) }

dependencies {
    implementation(libs.androidx.core.ktx)

    implementation(libs.lynx)
    implementation(libs.lynx.jssdk)
    implementation(libs.lynx.trace)
    implementation(libs.primjs)

    implementation(libs.lynx.service.image)
    implementation(libs.fresco)
    implementation(libs.fresco.animated.gif)
    implementation(libs.fresco.animated.webp)
    implementation(libs.fresco.webpsupport)
    implementation(libs.fresco.animated.base)

    implementation(libs.lynx.service.log)
    implementation(libs.lynx.service.http)
    implementation(libs.okhttp)
}
