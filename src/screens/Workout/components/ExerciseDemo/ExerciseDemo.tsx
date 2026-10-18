import { Art } from "@/components/Art/Art.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./ExerciseDemo.css";

export type ExerciseDemoVM = {
  art: ArtSpec;
  name: string;
  prescription: string;
  swapNote?: string;
  cuesTitle: string;
  cues: string[];
};

export function ExerciseDemo({ art, name, prescription, swapNote, cuesTitle, cues }: ExerciseDemoVM) {
  return (
    <view className="exercise-demo">
      <Art spec={art} height={200} radius={22} figureScale={0.8} />
      <text className="exercise-demo-name">{name}</text>
      <text className="exercise-demo-rx">{prescription}</text>
      {swapNote ? <text className="exercise-demo-swap">{swapNote}</text> : null}
      {cues.length > 0 ? <text className="exercise-demo-cues-title">{cuesTitle}</text> : null}
      {cues.map((c) => (
        <text key={c} className="exercise-demo-cue">
          {`• ${c}`}
        </text>
      ))}
    </view>
  );
}
