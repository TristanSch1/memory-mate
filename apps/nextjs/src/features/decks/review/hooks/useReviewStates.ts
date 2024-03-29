import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { type TGrade } from "@/features/decks";
import { URLPath } from "@/routes";
import { api, type RouterOutputs } from "@/utils/api";

export const useReviewStates = (
  deck: NonNullable<RouterOutputs["deck"]["forReview"]>,
  deckReview: NonNullable<RouterOutputs["deckReview"]["create"]>,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const deckReviewStartTimestamp = useRef(Date.now());
  const cardReviewStartTimestamp = useRef(Date.now());

  const router = useRouter();

  const card = deck.cards[currentIndex];

  if (!card) {
    throw new Error("Card not found");
  }

  const flip = () => {
    if (isFlipped) return;
    setIsFlipped(true);
  };

  const { mutate: deckReviewMutation } = api.deckReview.update.useMutation({
    onSuccess() {
      deckReviewStartTimestamp.current = Date.now();
      void router.push(URLPath.reviewRecap(deck.id, deckReview.id));
    },
  });
  const onFinish = (duration: number) => {
    try {
      deckReviewMutation({
        deckReviewId: deckReview.id,
        deckId: deck.id,
        duration,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const next = () => {
    if (!isFlipped) return;
    setIsFlipped(false);
    cardReviewStartTimestamp.current = Date.now();
    if (currentIndex === deck.cards.length - 1) {
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

  const review = (grade: TGrade) => {
    try {
      const duration = Date.now() - cardReviewStartTimestamp.current;
      cardReviewMutation({
        cardId: card.id,
        deckReviewId: deckReview.id,
        grade,
        duration,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    currentIndex,
    flip,
    isFlipped,
    review,
    card,
  };
};
