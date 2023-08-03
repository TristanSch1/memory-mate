import { type ComponentPropsWithoutRef } from "react";
import { useReview } from "@/features/decks/review";
import { Rate, type TRate } from "@/features/decks/review/types";
import { clsx } from "clsx";
import { useTranslation } from "next-i18next";

type RateButtonProps = ComponentPropsWithoutRef<"button"> & { rate: TRate };
const RateButton = ({
  rate,
  children,
  className,
  ...props
}: RateButtonProps) => {
  return (
    <button
      type={"button"}
      className={clsx(
        className,
        "flex h-10 flex-1 cursor-pointer items-center justify-center",
        {
          "bg-red-500 text-red-950 hover:bg-red-400": rate === Rate.BAD,
          "bg-yellow-500 text-yellow-950 hover:bg-yellow-400":
            rate === Rate.GOOD,
          "bg-green-500 text-green-950 hover:bg-green-400": rate === Rate.GREAT,
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export const RateCard = () => {
  const { t } = useTranslation("review");
  const { review } = useReview();
  return (
    <div className={"flex w-full rounded-lg border"}>
      {Object.values(Rate).map((rate) => (
        <RateButton rate={rate} key={rate} onClick={() => review(rate)}>
          {t(`rate.${rate.toString()}`)}
        </RateButton>
      ))}
    </div>
  );
};
