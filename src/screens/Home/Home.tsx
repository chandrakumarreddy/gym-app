import { Button } from "@/components/Button/Button.tsx";
import { greeting } from "@/utils/format.ts";

import "./Home.css";

export function Home() {
  return (
    <view className="home">
      <text className="home-title">Hello world 😊</text>
      <text className="home-subtitle">{greeting(new Date())}</text>
      <Button label="Start workout" onTap={() => console.log("start")} />
    </view>
  );
}
