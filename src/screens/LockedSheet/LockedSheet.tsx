import { useEffect, useMemo, useState } from "@lynx-js/react";

import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { getOffering, purchase } from "@/services/purchases.ts";
import type { LockedSheetParams } from "@/types/locked.ts";

import "./LockedSheet.css";

export type LockedSheetProps = LockedSheetParams & { onClose: () => void };

type BuyState = "idle" | "buying" | "error" | "pending";
type OfferInfo = { trialEligible: boolean; packPrice: string | null; failed?: boolean };

export function LockedSheet({ contentType, contentId, title, sessionCount, packProductId, onClose }: LockedSheetProps) {
  const t = useT();
  const { push } = useRouter();
  const [offer, setOffer] = useState<OfferInfo | null>(null);
  const [buy, setBuy] = useState<BuyState>("idle");
  const [attempt, setAttempt] = useState(0);
  const showPack = contentType === "program" && !!packProductId;

  useEffect(() => {
    let cancelled = false;
    setOffer(null);
    getOffering().then(
      (o) => {
        if (cancelled) return;
        const annual = o.products.find((p) => p.id === "premium_annual");
        const pack = packProductId ? o.products.find((p) => p.id === packProductId) : undefined;
        setOffer({ trialEligible: annual?.trialEligible ?? false, packPrice: pack?.priceString ?? null });
      },
      () => !cancelled && setOffer({ trialEligible: false, packPrice: null, failed: true }),
    );
    return () => {
      cancelled = true;
    };
  }, [packProductId, attempt]);

  const benefits = useMemo(
    () => [
      sessionCount ? t("locked.benefit.sessions", { n: sessionCount }) : t("locked.benefit.content", { title }),
      t("locked.benefit.library"),
      t("locked.benefit.offline"),
    ],
    [t, sessionCount, title],
  );

  const onTrial = () => {
    onClose();
    push({ name: "paywall", source: "locked", contentId });
  };

  const onBuy = () => {
    if (!packProductId || buy === "buying") return;
    setBuy("buying");
    purchase(packProductId).then(
      (r) => {
        if (r.status === "success") onClose();
        else setBuy(r.status === "cancelled" ? "idle" : r.status === "pending" ? "pending" : "error");
      },
      () => setBuy("error"),
    );
  };

  const trialLabel = offer && !offer.failed && !offer.trialEligible ? t("locked.getPremium") : t("locked.trial");

  return (
    <view className="locked">
      <view className="locked-head">
        <ProBadge size="tile" />
        <view className="locked-head-copy">
          <text className="locked-title">{t("locked.title", { title })}</text>
          <text className="locked-sub">{t("locked.subtitle")}</text>
        </view>
      </view>

      <view className="locked-benefits">
        {benefits.map((b) => (
          <view key={b} className="locked-benefit">
            <Icon name="check" tone="ember" size={18} />
            <text className="locked-benefit-text">{b}</text>
          </view>
        ))}
      </view>

      <Button label={trialLabel} fullWidth className="locked-trial" disabled={buy === "buying"} onTap={onTrial} />

      {showPack ? (
        <view>
          <view className="locked-or">
            <view className="locked-hairline" />
            <text className="locked-or-text">{t("locked.or")}</text>
            <view className="locked-hairline" />
          </view>
          {offer?.failed ? (
            <Button label={t("common.retry")} variant="ghost" fullWidth className="locked-buy" onTap={() => setAttempt((a) => a + 1)} />
          ) : offer ? (
            offer.packPrice ? (
              <Button
                label={t("locked.buyOnce", { price: offer.packPrice })}
                variant="ghost"
                fullWidth
                loading={buy === "buying"}
                className="locked-buy"
                onTap={onBuy}
              />
            ) : null
          ) : (
            <Skeleton height={56} radius={16} className="locked-buy" />
          )}
          {buy === "error" || buy === "pending" ? (
            <text className="locked-msg">{buy === "error" ? t("locked.error") : t("locked.pending")}</text>
          ) : (
            <text className="locked-note">{t("locked.note")}</text>
          )}
        </view>
      ) : null}
    </view>
  );
}
