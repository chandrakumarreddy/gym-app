import "./theme/tokens.css";
import "./App.css";

import { Home } from "./screens/Home/Home.tsx";

export function App() {
  return (
    <view className="app">
      <Home />
    </view>
  );
}
