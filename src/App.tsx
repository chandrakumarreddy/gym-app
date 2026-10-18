import { useEffect, useRef } from "@lynx-js/react";

import "./theme/tokens.css";
import "./App.css";

import { hapticsEnabled } from "@/api/haptics.ts";
import { isIOS } from "@/api/platform.ts";
import { getJSON, setJSON } from "@/api/storage.ts";
import { appReady, setFullBleed } from "@/api/systemBars.ts";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { HapticsPrompt } from "@/components/HapticsPrompt/HapticsPrompt.tsx";
import { TabBar } from "@/components/TabBar/TabBar.tsx";
import { LOCALE_KEY, LocaleProvider, type Locale } from "@/hooks/useLocale.tsx";
import { RouterProvider, useRouter } from "@/hooks/useRouter.tsx";
import { useScreenLayers } from "@/hooks/useScreenLayers.ts";
import { Building } from "@/screens/Building/Building.tsx";
import { Challenges } from "@/screens/Challenges/Challenges.tsx";
import { CoachProfile } from "@/screens/CoachProfile/CoachProfile.tsx";
import { Complete } from "@/screens/Complete/Complete.tsx";
import { FormCheck } from "@/screens/FormCheck/FormCheck.tsx";
import { Home } from "@/screens/Home/Home.tsx";
import { Library } from "@/screens/Library/Library.tsx";
import { LockedSheet } from "@/screens/LockedSheet/LockedSheet.tsx";
import { Paywall } from "@/screens/Paywall/Paywall.tsx";
import { PlanPreview } from "@/screens/PlanPreview/PlanPreview.tsx";
import { Player } from "@/screens/Player/Player.tsx";
import { Profile } from "@/screens/Profile/Profile.tsx";
import { Program } from "@/screens/Program/Program.tsx";
import { Progress } from "@/screens/Progress/Progress.tsx";
import { QuizBody } from "@/screens/QuizBody/QuizBody.tsx";
import { QuizExperience } from "@/screens/QuizExperience/QuizExperience.tsx";
import { QuizGoal } from "@/screens/QuizGoal/QuizGoal.tsx";
import { QuizSchedule } from "@/screens/QuizSchedule/QuizSchedule.tsx";
import { RestLog } from "@/screens/RestLog/RestLog.tsx";
import { Signup } from "@/screens/Signup/Signup.tsx";
import { Welcome } from "@/screens/Welcome/Welcome.tsx";
import { WinBack } from "@/screens/WinBack/WinBack.tsx";
import { Workout } from "@/screens/Workout/Workout.tsx";
import { startRoute } from "@/state/startRoute.ts";
import type { Route } from "@/types/route.ts";

const HAPTICS_PROMPTED_KEY = "fitcue.hapticsPrompted";
// Home holds the splash until its feed settles; never longer than this.
const SPLASH_MAX_MS = 4000;

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case "welcome":
      return <Welcome />;
    case "quiz-goal":
      return <QuizGoal />;
    case "quiz-experience":
      return <QuizExperience />;
    case "quiz-schedule":
      return <QuizSchedule />;
    case "quiz-body":
      return <QuizBody />;
    case "building":
      return <Building />;
    case "plan-preview":
      return <PlanPreview {...route} />;
    case "signup":
      return <Signup {...route} />;
    case "paywall":
      return <Paywall {...route} />;
    case "home":
      return <Home />;
    case "library":
      return <Library {...route} />;
    case "program":
      return <Program {...route} />;
    case "workout":
      return <Workout {...route} />;
    case "player":
      return <Player {...route} />;
    case "rest-log":
      return <RestLog {...route} />;
    case "complete":
      return <Complete {...route} />;
    case "progress":
      return <Progress />;
    case "challenges":
      return <Challenges {...route} />;
    case "coach":
      return <CoachProfile {...route} />;
    case "form-check":
      return <FormCheck {...route} />;
    case "profile":
      return <Profile />;
    case "winback":
      return <WinBack {...route} />;
  }
}

function OverlayHost() {
  const { overlay, closeOverlay } = useRouter();
  // Keep the last sheet's content while it slides out.
  const last = useRef(overlay);
  if (overlay) last.current = overlay;
  const shown = overlay ?? last.current;
  return (
    <BottomSheet visible={overlay !== null} onDismiss={closeOverlay}>
      {shown?.kind === "locked" ? <LockedSheet {...shown.params} onClose={closeOverlay} /> : null}
      {shown?.kind === "haptics" ? <HapticsPrompt onClose={closeOverlay} /> : null}
    </BottomSheet>
  );
}

function Shell() {
  const { route, depth, tab, showTabBar, openHapticsPrompt } = useRouter();
  const layers = useScreenLayers(route, depth, tab);
  const fullBleed = route.name === "welcome";
  useEffect(() => setFullBleed(fullBleed), [fullBleed]);
  useEffect(() => {
    if (route.name !== "home") {
      appReady();
      return;
    }
    const id = setTimeout(appReady, SPLASH_MAX_MS);
    return () => clearTimeout(id);
  }, []);
  const atHome = route.name === "home";
  useEffect(() => {
    if (!atHome || getJSON<boolean>(HAPTICS_PROMPTED_KEY) || hapticsEnabled()) return;
    setJSON(HAPTICS_PROMPTED_KEY, true);
    openHapticsPrompt();
  }, [atHome]);

  return (
    <view className="app-shell">
      {layers.map((l) => (
        <view key={l.id} className={`app-screen${l.anim ? ` app-screen-${l.anim}` : ""}`} user-interaction-enabled={!l.leaving}>
          <Screen route={l.route} />
        </view>
      ))}
      {showTabBar ? (
        <view className="app-tabbar">
          <TabBar />
        </view>
      ) : null}
      <OverlayHost />
    </view>
  );
}

export function App() {
  const locale = getJSON<Locale>(LOCALE_KEY) ?? "en";
  // Resolved while the native splash is still up, so the first screen is already the right one.
  const initial = startRoute();

  return (
    <view className={`app${isIOS ? " app-ios" : ""}`}>
      <LocaleProvider initial={locale}>
        <RouterProvider initial={initial}>
          <Shell />
        </RouterProvider>
      </LocaleProvider>
    </view>
  );
}
