import { isIOS } from "@/api/platform.ts";

import "./Glass.css";

type GlassProps = {
  radius?: number;
  corners?: "all" | "top";
  material?: "glass" | "blur";
};

// Backdrop blur behind a component's content: first child of a positioned container. iOS only;
// Android has no backdrop blur, so the container's own CSS fill stands in.
export function Glass({ radius = 0, corners = "all", material = "glass" }: GlassProps) {
  if (!isIOS) return null;
  return <glass-view className="glass" radius={radius} corners={corners} material={material} />;
}
