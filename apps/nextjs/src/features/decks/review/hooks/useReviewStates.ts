import { useRef, useState } from "react";
import { type TRate, type TReviewState } from "@/features/decks/review/types";
import { api, type RouterOutputs } from "@/utils/api";

export const useReviewStates = (
  deck: NonNullable<RouterOutputs["deck"]["forReview"]>,
) => {
  const [reviewState, setReviewState] = useState<TReviewState>("REVIEWING");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const deckReviewStartTimestamp = useRef(Date.now());
  const cardReviewStartTimestamp = useRef(Date.now());

  const card = deck.cards[currentIndex];

  if (!card) {
    throw new Error("Card not found");
  }

  const flip = () => {
    if (isFlipped) return;
    setIsFlipped(true);
  };

  const { mutate: deckReviewMutation } = api.deck.review.useMutation({
    onSuccess() {
      deckReviewStartTimestamp.current = Date.now();
    },
  });
  const onFinish = (duration: number) => {
    try {
      deckReviewMutation({ deckId: deck.id, duration });
    } catch (e) {
      console.error(e);
    }
  };
  const next = () => {
    if (!isFlipped) return;
    setIsFlipped(false);
    cardReviewStartTimestamp.current = Date.now();
    if (currentIndex === deck.cards.length - 1) {
      setReviewState("FINISHED");
      const duration = Date.now() - deckReviewStartTimestamp.current;
      onFinish(duration);
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const { mutate: cardReviewMutation } = api.card.review.useMutation({
    onSuccess() {
      next();
    },
  });

  const review = (rate: TRate) => {
    try {
      const duration = Date.now() - cardReviewStartTimestamp.current;
      cardReviewMutation({ cardId: card.id, rate, duration });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    currentIndex,
    flip,
    isFlipped,
    review,
    reviewState,
    card,
  };
};
