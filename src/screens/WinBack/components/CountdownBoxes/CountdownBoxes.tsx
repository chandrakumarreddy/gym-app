import "./CountdownBoxes.css";

type CountdownBoxesProps = {
  parts: [string, string, string];
  labels: [string, string, string];
};

export function CountdownBoxes({ parts, labels }: CountdownBoxesProps) {
  return (
    <view className="cd-boxes">
      {parts.map((p, i) => (
        <view key={labels[i]} className={`cd-box${i > 0 ? " cd-box-gap" : ""}`}>
          <text className="cd-value">{p}</text>
          <text className="cd-label">{labels[i]}</text>
        </view>
      ))}
    </view>
  );
}
