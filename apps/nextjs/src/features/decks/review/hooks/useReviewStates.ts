import { useState } from "react";

type TReviewState = "REVIEWING" | "FINISHED";
export const useReviewStates = (deckLength: number) => {
  const [reviewState, setReviewState] = useState<TReviewState>("REVIEWING");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = () => {
    if (isFlipped) return;
    setIsFlipped(true);
  };

  const next = () => {
    if (!isFlipped) return;
    if (currentIndex === deckLength - 1) {
      setReviewState("FINISHED");
      return;
    }
    setIsFlipped(false);
    setCurrentIndex((index) => index + 1);
  };

  return {
    currentIndex,
    flip,
    isFlipped,
    next,
    reviewState,
  };
};
