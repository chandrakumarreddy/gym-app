import { execSync } from "node:child_process";
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";

// With ANDROID_RELOAD=1, launch the debug app on first build and re-render it on every rebuild.
const androidDevices = () =>
  execSync("adb devices")
    .toString()
    .split("\n")
    .slice(1)
    .filter((l) => l.endsWith("\tdevice"))
    .map((l) => l.split("\t")[0]);

const pluginAndroidReload = () => ({
  name: "android-reload",
  setup(api: any) {
    if (!process.env.ANDROID_RELOAD) return;
    api.onDevCompileDone(({ isFirstCompile }: { isFirstCompile: boolean }) => {
      for (const s of androidDevices()) {
        try {
          if (isFirstCompile) {
            execSync(`adb -s ${s} reverse tcp:3000 tcp:3000`);
            execSync(`adb -s ${s} shell am start -n com.gymapp/.MainActivity`);
          } else {
            execSync(`adb -s ${s} shell am broadcast -a com.gymapp.RELOAD -p com.gymapp`);
          }
        } catch (e) {
          console.warn(`[android-reload] ${s}: ${(e as Error).message}`);
        }
      }
    });
  },
});

export default defineConfig({
  source: {
    entry: "./src/index.tsx",
  },
  resolve: {
    alias: { "@": "./src" },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [pluginReactLynx(), pluginAndroidReload()],
  environments: {
    web: {},
    lynx: {},
  },
});
