import { useState } from "react";
import { FlipButton } from "@/features/decks/review/components/FlipButton";
import { ReviewCard } from "@/features/decks/review/components/ReviewCard";

export const Review = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = () => setIsFlipped((prev) => !prev);
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-4"
      }
    >
      <ReviewCard isFlipped={isFlipped} />
      <FlipButton onClick={flip} />
    </div>
  );
};
