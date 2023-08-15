import { forwardRef, type ComponentPropsWithoutRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReview } from "@/features/decks/review";
import { GRADES, type TGrade } from "@/features/decks/review/types";
import { clsx } from "clsx";
import { useTranslation } from "next-i18next";

type RateButtonProps = ComponentPropsWithoutRef<"button"> & { grade: TGrade };
const RateButton = forwardRef<HTMLButtonElement, RateButtonProps>(
  ({ grade, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={"button"}
        className={clsx(
          className,
          "flex h-full flex-1 cursor-pointer items-center justify-center px-4 py-2 text-sm font-semibold sm:text-base",
          {
            "bg-red-500 text-red-950 hover:bg-red-400": grade === 0,
            "bg-orange-500 text-orange-950 hover:bg-orange-400": grade === 1,
            "bg-yellow-500 text-yellow-950 hover:bg-yellow-400": grade === 2,
            "bg-green-300 text-green-700 hover:bg-green-200": grade === 3,
            "bg-green-400 text-green-800 hover:bg-green-300": grade === 4,
            "bg-green-500 text-green-950 hover:bg-green-400": grade === 5,
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

const RateTooltip = ({ grade }: { grade: TGrade }) => {
  const { review } = useReview();
  const { t } = useTranslation("review");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={() => review(grade)}>
          <RateButton grade={grade}>{grade}</RateButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t(`grade.tooltip.${grade}`)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export const RateCard = () => {
  return (
    <div className={"flex w-full rounded-lg border"}>
      {GRADES.map((grade) => (
        <RateTooltip grade={grade} key={grade} />
      ))}
    </div>
  );
};
