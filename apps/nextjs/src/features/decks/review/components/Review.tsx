import { useReview } from "@/features/decks";

import { FlipButton } from "./FlipButton";
import { RateCard } from "./RateCard";
import { ReviewCard } from "./ReviewCard";

export const Review = () => {
  const { card, isFlipped, flip } = useReview();

  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-4"
      }
    >
      <ReviewCard card={card} isFlipped={isFlipped} />
      {isFlipped ? (
        <RateCard />
      ) : (
        <FlipButton className={"w-full"} onClick={flip} />
      )}
    </div>
  );
};
