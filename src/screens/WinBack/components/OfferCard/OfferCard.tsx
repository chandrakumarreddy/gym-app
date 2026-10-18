import "./OfferCard.css";

type OfferCardProps = {
  badge: string;
  big: string;
  sub: string;
  strike: string;
  strong: string;
  rest: string;
};

export function OfferCard({ badge, big, sub, strike, strong, rest }: OfferCardProps) {
  return (
    <view className="offer-card">
      <view className="offer-card-pill">
        <text className="offer-card-pill-label">{badge}</text>
      </view>
      <text className="offer-card-big">{big}</text>
      <text className="offer-card-sub">{sub}</text>
      <text className="offer-card-price">
        <text className="offer-card-strike">{strike}</text>
        <text className="offer-card-strong">{` ${strong}`}</text>
        <text className="offer-card-rest">{rest}</text>
      </text>
    </view>
  );
}
