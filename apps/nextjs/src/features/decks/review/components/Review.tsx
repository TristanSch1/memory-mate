import { useReview } from "@/features/decks/review";
import { FlipButton } from "@/features/decks/review/components/FlipButton";
import { RateCard } from "@/features/decks/review/components/RateCard";
import { ReviewCard } from "@/features/decks/review/components/ReviewCard";

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
