import { useEffect, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getSession } from "@/api/sessions.ts";
import { Art } from "@/components/Art/Art.tsx";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { CoachCue } from "@/components/CoachCue/CoachCue.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { PlayerControls } from "@/components/PlayerControls/PlayerControls.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { SetDots } from "@/components/SetDots/SetDots.tsx";
import { Video, useVideoController } from "@/components/Video/Video.tsx";
import { useLocale } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { RestLog } from "@/screens/RestLog/RestLog.tsx";
import { useEntitlement } from "@/services/purchases.ts";
import * as session from "@/state/workoutSession.ts";
import type { PaywallSource } from "@/types/purchases.ts";
import type { RouteParams } from "@/types/route.ts";
import type { PlaybackSpeed } from "@/types/session.ts";
import { formatClock, pad2 } from "@/utils/format.ts";
import { currentExercise, nextExercise, setsOf } from "@/utils/session.ts";

import { PlayerSkeleton } from "./components/PlayerSkeleton/PlayerSkeleton.tsx";
import { RestPill } from "./components/RestPill/RestPill.tsx";
import { Scrubber } from "./components/Scrubber/Scrubber.tsx";
import { UpNextCard } from "./components/UpNextCard/UpNextCard.tsx";

import "./Player.css";

const SPEEDS: PlaybackSpeed[] = [0.75, 1, 1.25, 1.5];
const SPEED_LABEL: Record<PlaybackSpeed, string> = { 0.75: "0.75×", 1: "1.0×", 1.25: "1.25×", 1.5: "1.5×" };

export function Player({ sessionId, resumeAtSec }: RouteParams<"player">) {
  const { t, locale } = useLocale();
  const { push, back, replace } = useRouter();
  const { premium } = useEntitlement();
  const s = session.useWorkoutSession((x) => (x && x.id === sessionId ? x : null));
  const controller = useVideoController();

  const [sec, setSec] = useState(0);
  const secRef = useRef(0);
  const [restCollapsed, setRestCollapsed] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const startedRef = useRef(false);
  const resumedRef = useRef(false);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (session.getState()?.id === sessionId) return;
    const saved = session.getSaved();
    if (saved?.id === sessionId) {
      resumedRef.current = true;
      session.restore(saved);
      return;
    }
    let cancelled = false;
    setLoadError(false);
    getSession(sessionId).then(
      (w) => !cancelled && session.start(w),
      () => !cancelled && setLoadError(true),
    );
    return () => {
      cancelled = true;
    };
  }, [sessionId, attempt]);

  useEffect(
    () => () => {
      const cur = session.getState();
      if (cur?.id === sessionId && cur.phase === "playing") {
        session.syncPosition(secRef.current);
        session.pause();
      }
    },
    [sessionId],
  );

  const restStartedAt = s?.rest?.startedAt;
  useEffect(() => setRestCollapsed(false), [restStartedAt]);

  const ex = s ? currentExercise(s) : undefined;
  const setKey = s ? `${s.exerciseIndex}-${s.setIndex}` : "";
  const segmentSec = ex?.segmentSec ?? 90;
  const startSec = s && s.positionSec < segmentSec ? (resumeAtSec !== undefined && !startedRef.current ? resumeAtSec : s.positionSec) : 0;

  useEffect(() => {
    secRef.current = startSec;
    setSec(startSec);
  }, [setKey]);

  if (!s || !ex) {
    return (
      <PlayerSkeleton
        setTimeLabel={t("player.setTime")}
        error={loadError ? { text: t("workout.error"), retryLabel: t("common.retry"), onRetry: () => setAttempt((n) => n + 1) } : undefined}
        onCollapse={() => {
          if (!back()) replace({ name: "workout", sessionId });
        }}
      />
    );
  }

  const phase = s.phase;
  const resting = phase === "resting";
  const playing = phase === "playing";
  const next = nextExercise(s);
  const totalSetsHere = setsOf(ex);
  const cues = ex.cues;
  let cue = cues[0];
  for (const c of cues) if (c.atSec <= sec) cue = c;
  const repsValue = Array.isArray(ex.reps) ? `${ex.reps[0]}–${ex.reps[1]}` : String(ex.reps ?? ex.durationSec ?? "");
  const repsUnit = ex.kind === "follow_along" ? t("player.unit.sec") : t(`player.unit.${ex.repsUnit}`);
  const setTime = `${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)}`;

  const gate = (source: PaywallSource, content: string) => {
    track("lock_tapped", { content });
    push({ name: "paywall", source });
  };

  const onReady = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const cur = session.getState();
    if (!cur) return;
    if (cur.phase === "loading") {
      session.play();
      track("workout_started", {
        workoutId: cur.workoutId,
        programId: cur.workout.programId,
        week: cur.workout.weekIndex,
        day: cur.workout.dayIndex,
        resumed: false,
      });
    } else if (resumedRef.current) {
      track("workout_started", { workoutId: cur.workoutId, programId: cur.workout.programId, week: cur.workout.weekIndex, day: cur.workout.dayIndex, resumed: true });
    }
  };

  const onSecond = ({ sec: next }: { sec: number }) => {
    secRef.current = next;
    setSec(next);
  };

  const endSet = () => {
    const cur = session.getState();
    if (!cur || (cur.phase !== "playing" && cur.phase !== "paused" && cur.phase !== "buffering")) return;
    track("set_completed", { exerciseId: currentExercise(cur)?.id ?? "", setIndex: cur.setIndex });
    session.syncPosition(0);
    session.completeSet();
  };

  const onToggle = () => {
    if (playing) {
      session.syncPosition(secRef.current);
      session.pause();
    } else if (phase === "paused" || phase === "loading") {
      session.play();
    }
  };

  const onSpeed = () => {
    if (!premium) return gate("player_speed", "speed");
    session.setSpeed(SPEEDS[(SPEEDS.indexOf(s.speed) + 1) % SPEEDS.length]);
  };

  const onPrev = () => {
    if (secRef.current > 3) {
      controller.seek(0);
      session.syncPosition(0);
    } else {
      session.prev();
    }
  };

  const onCollapse = () => {
    session.syncPosition(secRef.current);
    if (session.getState()?.phase === "playing") session.pause();
    if (!back()) replace({ name: "workout", sessionId });
  };

  const onCast = () => {
    if (!premium) return gate("player_cast", "cast");
    track("cast_started", { exerciseId: ex.id });
  };

  const onCue = () => {
    if (!premium) return gate("player_voice_cues", "voice_cues");
    session.toggleVoice();
  };

  const onScrubEnd = (r: number) => {
    const target = Math.round(r * segmentSec);
    controller.seek(target);
    session.syncPosition(target);
    track("player_scrubbed", { exerciseId: ex.id, toSec: target });
  };

  const queue = s.workout.exercises.map((e, i) => ({ id: e.id, name: e.name, art: e.art, i })).slice(s.exerciseIndex + 1);

  return (
    <view className="player">
      <view className="player-stage">
        <Video
          key={setKey}
          className="player-video"
          art={ex.art}
          src={ex.videoUrl}
          paused={!playing}
          rate={s.speed}
          startTime={startSec}
          durationSec={segmentSec}
          captionsVisible={s.captions}
          controller={controller}
          onReady={onReady}
          onBuffering={(b) => session.setBuffering(b)}
          onSecond={onSecond}
          onEnded={endSet}
        />
        <view className="player-scrim-top" />
        <view className="player-scrim-bottom" />
        <view className="player-top">
          <IconButton icon="chev-d" variant="glass" onTap={onCollapse} />
          <text className="player-title" text-maxline="1">{s.workout.title}</text>
          <IconButton icon="cast" variant="glass" iconSize={20} badge={premium ? undefined : <ProBadge mini />} onTap={onCast} />
        </view>
        <view className="player-settime">
          <text className="player-settime-value">{setTime}</text>
          <text className="player-settime-cap">{t("player.setTime")}</text>
        </view>
        {cue ? (
          <Pressable className="player-cue" onTap={onCue}>
            <CoachCue initials={ex.coach.initials} text={cue.text[locale] ?? cue.text.en} speaking={s.voiceCues} />
          </Pressable>
        ) : null}
        {phase === "buffering" ? (
          <view className="player-buffering">
            <view className="player-spinner" />
          </view>
        ) : null}
        <view className="player-info">
          <view className="player-info-row">
            <view className="player-info-main">
              <text className="player-info-cap">{t("player.exerciseOf", { i: s.exerciseIndex + 1, n: s.workout.exercises.length })}</text>
              <text className="player-info-name" text-maxline="2">{ex.name}</text>
            </view>
            <view className="player-info-reps">
              <text className="player-info-reps-value">{repsValue}</text>
              <text className="player-info-cap">{repsUnit}</text>
            </view>
          </view>
          <Scrubber ratio={sec / segmentSec} elapsedLabel={formatClock(sec)} durationLabel={formatClock(segmentSec)} onScrubEnd={onScrubEnd} />
        </view>
      </view>
      <view className="player-body">
        <view className="player-set-row">
          <text className="player-set-label">{t("player.setOf", { i: s.setIndex + 1, n: totalSetsHere })}</text>
          <SetDots total={totalSetsHere} done={s.setIndex} current={s.setIndex} />
        </view>
        <view className="player-controls-wrap">
          <PlayerControls
            playing={playing || resting}
            speedLabel={SPEED_LABEL[s.speed]}
            captionsOn={s.captions}
            speedLocked={!premium}
            onSpeed={onSpeed}
            onPrev={onPrev}
            onToggle={onToggle}
            onNext={endSet}
            onCaptions={() => session.toggleCaptions()}
          />
        </view>
        {resting && restCollapsed && s.rest ? <RestPill endsAt={s.rest.endsAt} onTap={() => setRestCollapsed(false)} /> : null}
        {next ? (
          <UpNextCard
            art={next.art}
            eyebrow={ex.restSec > 0 ? t("player.upNext", { s: ex.restSec }) : t("player.upNextLabel")}
            title={next.name}
            onTap={() => setQueueOpen(true)}
          />
        ) : null}
      </view>
      {resting && !restCollapsed ? (
        <view className="player-rest-layer">
          <RestLog sessionId={sessionId} onCollapse={() => setRestCollapsed(true)} />
        </view>
      ) : null}
      <BottomSheet visible={queueOpen} onDismiss={() => setQueueOpen(false)} title={t("player.queueTitle")}>
        {queue.map((q) => (
          <ListRow
            key={q.id}
            title={q.name}
            thumb={<Art spec={q.art} size={44} radius={12} />}
            chevron
            onTap={() => {
              setQueueOpen(false);
              session.jumpTo(q.i);
            }}
          />
        ))}
      </BottomSheet>
    </view>
  );
}
