import { forwardRef, type ComponentPropsWithoutRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReview } from "@/features/decks/review";
import { Rate, type TRate } from "@/features/decks/review/types";
import { clsx } from "clsx";
import { useTranslation } from "next-i18next";

type RateButtonProps = ComponentPropsWithoutRef<"button"> & { rate: TRate };
const RateButton = forwardRef<HTMLButtonElement, RateButtonProps>(
  ({ rate, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={"button"}
        className={clsx(
          className,
          "flex h-full flex-1 cursor-pointer items-center justify-center px-4 py-2 text-sm font-semibold sm:text-base",
          {
            "bg-red-500 text-red-950 hover:bg-red-400": rate === 0,
            "bg-orange-500 text-orange-950 hover:bg-orange-400": rate === 1,
            "bg-yellow-500 text-yellow-950 hover:bg-yellow-400": rate === 2,
            "bg-green-300 text-green-700 hover:bg-green-200": rate === 3,
            "bg-green-400 text-green-800 hover:bg-green-300": rate === 4,
            "bg-green-500 text-green-950 hover:bg-green-400": rate === 5,
          },
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

RateButton.displayName = "RateButton";

const RateTooltip = ({ rate }: { rate: TRate }) => {
  const { review } = useReview();
  const { t } = useTranslation("review");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={() => review(rate)}>
          <RateButton rate={rate}>{rate}</RateButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t(`rate.tooltip.${rate}`)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export const RateCard = () => {
  return (
    <div className={"flex w-full rounded-lg border"}>
      {Rate.map((rate) => (
        <RateTooltip rate={rate} key={rate} />
      ))}
    </div>
  );
};
