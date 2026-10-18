#!/usr/bin/env python3
"""Generate every FitCue app icon, launcher and launch/splash asset for iOS,
Android and Expo from the master artwork below.

    pip install playwright pillow && python -m playwright install chromium
    python3 generate.py            # writes ios/, android/, expo/, store/, source/

Change the colours or the mark here and re-run; every size is regenerated.
"""
import json
import shutil
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent
APP = "FitCue"

# Brand (matches mockups/styles.css)
EMBER_1, EMBER_2, EMBER_3 = "#FF8A3D", "#FF5B1F", "#E2410F"
APP_BG = "#0D0B0A"          # launch / splash background (app background)
ICON_BG = "#FF5B1F"         # flat fallback for the adaptive background colour

# ------------------------------------------------------------------ artwork
# The mark: a kettlebell (fitness) with a heartbeat line cut through the bell
# (health). Drawn in a 1024 box, optically centred. The heartbeat is a mask,
# so the background shows through it on every variant.
MARK = """
<g transform="translate(0 -20)" mask="url(#kbcut)">
  <path d="M372 540 V372 C372 236 652 236 652 372 V540" stroke-width="84" fill="none" stroke="{c}" stroke-linecap="round"/>
  <path d="M431.2 842 A240 240 0 1 1 592.8 842 Z" fill="{c}"/>
</g>"""

GRAD = f"""<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="{EMBER_1}"/><stop offset=".55" stop-color="{EMBER_2}"/><stop offset="1" stop-color="{EMBER_3}"/>
</linearGradient>
<radialGradient id="glow" cx=".22" cy=".12" r=".75">
  <stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
</radialGradient>
<linearGradient id="markgrad" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="{EMBER_1}"/><stop offset="1" stop-color="{EMBER_3}"/>
</linearGradient>
<mask id="kbcut" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="5000" height="5000">
  <rect x="-2000" y="-2000" width="5000" height="5000" fill="#fff"/>
  <path d="M330 618 H418 L452 578 L486 618 H506 L542 508 L588 716 L620 618 H694" fill="none" stroke="#000" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>
</mask>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#7a1c00" flood-opacity=".35"/>
</filter>"""


def svg(body, defs=GRAD):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs>{defs}</defs>{body}</svg>'


def mark(color="#fff", scale=1.0, shadow=False):
    s = f'transform="translate(512 512) scale({scale}) translate(-512 -512)"'
    f = ' filter="url(#shadow)"' if shadow else ""
    return f'<g {s}{f}>{MARK.format(c=color)}</g>'


BG = '<rect width="1024" height="1024" fill="url(#bg)"/><rect width="1024" height="1024" fill="url(#glow)"/>'

ART = {
    # full-bleed square: iOS, App Store, Play Store, Expo
    "icon": svg(BG + mark(shadow=True)),
    # Android adaptive layers (108dp canvas, mark sized for the 72dp viewport)
    "adaptive-background": svg(BG),
    "adaptive-foreground": svg(mark(scale=0.6667, shadow=True)),
    "adaptive-monochrome": svg(mark(scale=0.6667)),
    # Android legacy launcher shapes
    "legacy-square": svg('<clipPath id="csq"><rect x="40" y="40" width="944" height="944" rx="190"/></clipPath>'
                         f'<g clip-path="url(#csq)">{BG}</g>' + mark(scale=0.92, shadow=True), GRAD),
    "legacy-round": svg('<clipPath id="crd"><circle cx="512" cy="512" r="472"/></clipPath>'
                        f'<g clip-path="url(#crd)">{BG}</g>' + mark(scale=0.84, shadow=True), GRAD),
    # iOS 18 appearances
    "ios-dark": svg(f'<g transform="translate(512 512) scale(.92) translate(-512 -512)">{MARK.format(c="url(#markgrad)")}</g>'),
    "ios-tinted": svg('<linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/>'
                      '<stop offset="1" stop-color="#cfcfcf"/></linearGradient>'
                      f'<g transform="translate(512 512) scale(.92) translate(-512 -512)">{MARK.format(c="url(#tg)")}</g>', GRAD),
    # Android notification small icon (white + alpha only)
    "notification": svg(mark(scale=1.18)),
    # Android 12+ splash icon: 288dp canvas, content inside the 192dp circle
    "splash": svg(f'<circle cx="512" cy="512" r="312" fill="url(#bg)"/><circle cx="512" cy="512" r="312" fill="url(#glow)"/>'
                  + mark(scale=0.6, shadow=True)),
    # rounded app-icon tile on transparent (iOS launch logo, Expo splash, README)
    "tile": svg('<clipPath id="ctl"><rect width="1024" height="1024" rx="230"/></clipPath>'
                f'<g clip-path="url(#ctl)">{BG}</g>' + mark(shadow=True), GRAD),
}

# ------------------------------------------------------------------ render
_png_cache = {}


def render(page, name, size):
    key = (name, size)
    if key not in _png_cache:
        page.set_viewport_size({"width": size, "height": size})
        page.set_content(f'<html><body style="margin:0;background:transparent">'
                         f'<div style="width:{size}px;height:{size}px">{ART[name].replace("<svg ", f"<svg width={size} height={size} ", 1)}</div></body></html>')
        tmp = ROOT / ".tmp.png"
        page.screenshot(path=str(tmp), omit_background=True, clip={"x": 0, "y": 0, "width": size, "height": size})
        _png_cache[key] = Image.open(tmp).convert("RGBA")
        _png_cache[key].load()
        tmp.unlink()
    return _png_cache[key]


def save(img, path, opaque=False, bg=(0, 0, 0)):
    path.parent.mkdir(parents=True, exist_ok=True)
    if opaque:
        flat = Image.new("RGB", img.size, bg)
        flat.paste(img, mask=img.split()[3])
        flat.save(path, optimize=True)
    else:
        img.save(path, optimize=True)


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)


# ------------------------------------------------------------------ iOS
IOS_ICONS = [  # (idiom, size pt, scale)
    ("iphone", 20, 2), ("iphone", 20, 3), ("iphone", 29, 2), ("iphone", 29, 3),
    ("iphone", 40, 2), ("iphone", 40, 3), ("iphone", 60, 2), ("iphone", 60, 3),
    ("ipad", 20, 1), ("ipad", 20, 2), ("ipad", 29, 1), ("ipad", 29, 2),
    ("ipad", 40, 1), ("ipad", 40, 2), ("ipad", 76, 1), ("ipad", 76, 2), ("ipad", 83.5, 2),
]


def ios(page):
    base = ROOT / "ios" / "Assets.xcassets"
    icon_dir = base / "AppIcon.appiconset"
    images = []
    # Single-size universal icon (Xcode 14+) with iOS 18 dark + tinted appearances
    save(render(page, "icon", 1024), icon_dir / "AppIcon-1024.png", opaque=True)
    save(render(page, "ios-dark", 1024), icon_dir / "AppIcon-1024-dark.png")
    save(render(page, "ios-tinted", 1024), icon_dir / "AppIcon-1024-tinted.png")
    images += [
        {"filename": "AppIcon-1024.png", "idiom": "universal", "platform": "ios", "size": "1024x1024"},
        {"appearances": [{"appearance": "luminosity", "value": "dark"}], "filename": "AppIcon-1024-dark.png",
         "idiom": "universal", "platform": "ios", "size": "1024x1024"},
        {"appearances": [{"appearance": "luminosity", "value": "tinted"}], "filename": "AppIcon-1024-tinted.png",
         "idiom": "universal", "platform": "ios", "size": "1024x1024"},
    ]
    write(icon_dir / "Contents.json", json.dumps({"images": images, "info": {"author": "xcode", "version": 1}}, indent=2))

    # Legacy per-size set (for older Xcode / React Native templates that still list every size)
    legacy = ROOT / "ios" / "legacy-sizes" / "AppIcon.appiconset"
    limages = []
    for idiom, pt, scale in IOS_ICONS:
        px = int(round(pt * scale))
        fn = f"Icon-{pt:g}@{scale}x.png" if idiom == "iphone" else f"Icon-{pt:g}@{scale}x~ipad.png"
        save(render(page, "icon", px), legacy / fn, opaque=True)
        limages.append({"filename": fn, "idiom": idiom, "scale": f"{scale}x", "size": f"{pt:g}x{pt:g}"})
    save(render(page, "icon", 1024), legacy / "Icon-1024.png", opaque=True)
    limages.append({"filename": "Icon-1024.png", "idiom": "ios-marketing", "scale": "1x", "size": "1024x1024"})
    write(legacy / "Contents.json", json.dumps({"images": limages, "info": {"author": "xcode", "version": 1}}, indent=2))

    # Launch screen: logo tile on the app background colour
    logo = base / "LaunchLogo.imageset"
    for s in (1, 2, 3):
        save(render(page, "tile", 112 * s), logo / f"LaunchLogo@{s}x.png")
    write(logo / "Contents.json", json.dumps({"images": [
        {"filename": f"LaunchLogo@{s}x.png", "idiom": "universal", "scale": f"{s}x"} for s in (1, 2, 3)],
        "info": {"author": "xcode", "version": 1}}, indent=2))
    r, g, b = (int(APP_BG[i:i + 2], 16) / 255 for i in (1, 3, 5))
    write(base / "LaunchBackground.colorset" / "Contents.json", json.dumps({"colors": [{"color": {
        "color-space": "srgb", "components": {"alpha": "1.000", "red": f"{r:.3f}", "green": f"{g:.3f}", "blue": f"{b:.3f}"}},
        "idiom": "universal"}], "info": {"author": "xcode", "version": 1}}, indent=2))
    write(base / "Contents.json", json.dumps({"info": {"author": "xcode", "version": 1}}, indent=2))
    write(ROOT / "ios" / "LaunchScreen.storyboard", LAUNCH_STORYBOARD)


LAUNCH_STORYBOARD = """<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="22505" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_12" orientation="portrait" appearance="dark"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="22504"/>
        <capability name="Named colors" minToolsVersion="9.0"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" image="LaunchLogo" translatesAutoresizingMaskIntoConstraints="NO" id="Lg0-Ph-001">
                                <rect key="frame" x="140.66666666666666" y="370" width="112" height="112"/>
                                <constraints>
                                    <constraint firstAttribute="width" constant="112" id="Lg0-W"/>
                                    <constraint firstAttribute="height" constant="112" id="Lg0-H"/>
                                </constraints>
                            </imageView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="Bcu-3y-fUS"/>
                        <color key="backgroundColor" name="LaunchBackground"/>
                        <constraints>
                            <constraint firstItem="Lg0-Ph-001" firstAttribute="centerX" secondItem="Ze5-6b-2t3" secondAttribute="centerX" id="Lg0-CX"/>
                            <constraint firstItem="Lg0-Ph-001" firstAttribute="centerY" secondItem="Ze5-6b-2t3" secondAttribute="centerY" id="Lg0-CY"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
    <resources>
        <image name="LaunchLogo" width="112" height="112"/>
        <namedColor name="LaunchBackground">
            <color red="0.051" green="0.043" blue="0.039" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
        </namedColor>
    </resources>
</document>
"""

# ------------------------------------------------------------------ Android
DENSITIES = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}

ADAPTIVE_XML = """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome" />
</adaptive-icon>
"""

COLORS_XML = f"""<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">{ICON_BG}</color>
    <color name="splash_background">{APP_BG}</color>
    <color name="brand_ember">{EMBER_2}</color>
    <color name="notification_accent">{EMBER_2}</color>
</resources>
"""

SPLASH_THEME_XML = """<?xml version="1.0" encoding="utf-8"?>
<!-- Android 12+ splash screen (androidx.core:core-splashscreen also back-ports it to API 23+).
     In AndroidManifest.xml set android:theme="@style/Theme.FitCue.Starting" on the launcher activity,
     then call installSplashScreen() before super.onCreate(). -->
<resources>
    <style name="Theme.FitCue.Starting" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/splash_background</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
        <item name="windowSplashScreenAnimationDuration">300</item>
        <item name="postSplashScreenTheme">@style/Theme.FitCue</item>
    </style>
</resources>
"""

MANIFEST_SNIPPET = """<?xml version="1.0" encoding="utf-8"?>
<!-- Merge these attributes and elements into your AndroidManifest.xml.
     Keep your existing attributes (label, theme, etc.) alongside them. -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round">

        <!-- Default push-notification icon and colour (Firebase Cloud Messaging) -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_stat_notification" />
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/notification_accent" />

        <!-- Launcher activity uses the splash theme; call installSplashScreen() in onCreate -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.FitCue.Starting" />
    </application>
</manifest>
"""


def android(page):
    res = ROOT / "android" / "app" / "src" / "main" / "res"
    for d, k in DENSITIES.items():
        mip = res / f"mipmap-{d}"
        save(render(page, "legacy-square", round(48 * k)), mip / "ic_launcher.png")
        save(render(page, "legacy-round", round(48 * k)), mip / "ic_launcher_round.png")
        save(render(page, "adaptive-foreground", round(108 * k)), mip / "ic_launcher_foreground.png")
        save(render(page, "adaptive-background", round(108 * k)), mip / "ic_launcher_background.png", opaque=True)
        save(render(page, "adaptive-monochrome", round(108 * k)), mip / "ic_launcher_monochrome.png")
        save(render(page, "notification", round(24 * k)), res / f"drawable-{d}" / "ic_stat_notification.png")
        save(render(page, "splash", round(288 * k)), res / f"drawable-{d}" / "splash_icon.png")
    for n in ("ic_launcher.xml", "ic_launcher_round.xml"):
        write(res / "mipmap-anydpi-v26" / n, ADAPTIVE_XML)
    write(res / "values" / "ic_launcher_colors.xml", COLORS_XML)
    write(res / "values" / "splash_theme.xml", SPLASH_THEME_XML)
    write(ROOT / "android" / "AndroidManifest.snippet.xml", MANIFEST_SNIPPET)


# ------------------------------------------------------------------ stores + Expo
FEATURE_HTML = """<html><head><style>
body{margin:0;width:1024px;height:500px;overflow:hidden;background:#0d0b0a;font-family:'Inter Display',Inter,sans-serif;color:#f7f3f0}
.g{position:absolute;inset:0;background:radial-gradient(60% 90% at 18% 50%,rgba(255,91,31,.38),rgba(255,91,31,0) 70%),radial-gradient(40% 60% at 95% 0%,rgba(255,138,61,.18),rgba(255,138,61,0))}
.w{position:absolute;left:96px;top:0;bottom:0;display:flex;align-items:center;gap:56px}
.t{font-weight:700;font-size:84px;letter-spacing:-.03em;line-height:1}
.s{font-size:30px;color:#c9c0b8;margin-top:18px;font-weight:500;letter-spacing:-.01em}
.s b{color:#ff8a3d;font-weight:600}
</style></head><body><div class="g"></div><div class="w"><div style="width:240px;height:240px">ICON</div>
<div><div class="t">FitCue</div><div class="s">Real coaches. Your plan. <b>Press play.</b></div></div></div></body></html>"""


def stores_and_expo(page):
    store = ROOT / "store"
    save(render(page, "icon", 1024), store / "app-store-icon-1024.png", opaque=True)
    save(render(page, "icon", 512), store / "play-store-icon-512.png", opaque=True)
    page.set_viewport_size({"width": 1024, "height": 500})
    page.set_content(FEATURE_HTML.replace("ICON", ART["tile"].replace("<svg ", "<svg width=240 height=240 ", 1)))
    page.evaluate("document.fonts.ready")
    tmp = store / "feature.png"
    page.screenshot(path=str(tmp))
    save(Image.open(tmp).convert("RGBA"), store / "play-feature-graphic-1024x500.png", opaque=True)
    tmp.unlink()

    expo = ROOT / "expo"
    save(render(page, "icon", 1024), expo / "icon.png", opaque=True)
    save(render(page, "adaptive-foreground", 1024), expo / "adaptive-icon.png")
    save(render(page, "adaptive-monochrome", 1024), expo / "adaptive-icon-monochrome.png")
    save(render(page, "tile", 1024), expo / "splash-icon.png")
    save(render(page, "notification", 96), expo / "notification-icon.png")
    save(render(page, "tile", 48), expo / "favicon.png")
    write(expo / "app.json.snippet", json.dumps({"expo": {
        "name": APP, "icon": "./assets/icon.png",
        "ios": {"icon": "./assets/icon.png"},
        "android": {"adaptiveIcon": {"foregroundImage": "./assets/adaptive-icon.png",
                                     "monochromeImage": "./assets/adaptive-icon-monochrome.png",
                                     "backgroundColor": ICON_BG}},
        "web": {"favicon": "./assets/favicon.png"},
        "plugins": [
            ["expo-splash-screen", {"image": "./assets/splash-icon.png", "imageWidth": 120,
                                    "resizeMode": "contain", "backgroundColor": APP_BG}],
            ["expo-notifications", {"icon": "./assets/notification-icon.png", "color": EMBER_2}],
        ]}}, indent=2))


def sources():
    src = ROOT / "source"
    for name in ("icon", "adaptive-foreground", "adaptive-background", "adaptive-monochrome", "notification", "splash", "tile"):
        write(src / f"{name}.svg", ART[name])


def preview(page):
    """One sheet showing every variant, for README / review."""
    cells = [("icon", "App Store / iOS"), ("legacy-square", "Android legacy"), ("legacy-round", "Android round"),
             ("adaptive-foreground", "Adaptive foreground"), ("ios-dark", "iOS dark"), ("ios-tinted", "iOS tinted"),
             ("splash", "Splash icon"), ("notification", "Notification")]
    html = ['<html><body style="margin:0;background:#1b1918;font-family:Inter,sans-serif;color:#ddd">'
            '<div style="display:flex;gap:28px;padding:36px;flex-wrap:wrap;width:1080px">']
    for name, label in cells:
        bg = "#000" if name in ("ios-dark", "ios-tinted", "notification", "adaptive-foreground") else "transparent"
        if name == "adaptive-foreground":
            inner = (f'<div style="width:220px;height:220px;border-radius:50%;overflow:hidden;position:relative">'
                     f'<div style="position:absolute;inset:-55px">{ART["adaptive-background"].replace("<svg ", "<svg width=330 height=330 ", 1)}</div>'
                     f'<div style="position:absolute;inset:-55px">{ART[name].replace("<svg ", "<svg width=330 height=330 ", 1)}</div></div>')
        else:
            rr = "48px" if name in ("icon", "ios-dark", "ios-tinted") else "0"
            inner = (f'<div style="width:220px;height:220px;border-radius:{rr};overflow:hidden;background:{bg}">'
                     f'{ART[name].replace("<svg ", "<svg width=220 height=220 ", 1)}</div>')
        html.append(f'<div style="display:flex;flex-direction:column;gap:12px;align-items:center">{inner}'
                    f'<span style="font-size:15px">{label}</span></div>')
    html.append("</div></body></html>")
    page.set_viewport_size({"width": 1080, "height": 620})
    page.set_content("".join(html))
    page.screenshot(path=str(ROOT / "preview.png"), full_page=True)


def main():
    for d in ("ios", "android", "expo", "store", "source"):
        shutil.rmtree(ROOT / d, ignore_errors=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(device_scale_factor=1)
        ios(page)
        android(page)
        stores_and_expo(page)
        sources()
        preview(page)
        browser.close()
    print("done")


if __name__ == "__main__":
    main()
