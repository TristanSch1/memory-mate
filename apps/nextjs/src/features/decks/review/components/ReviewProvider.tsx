import { createContext, useContext, type ReactNode } from "react";
import { useReviewStates } from "@/features/decks/review/hooks/useReviewStates";
import { type TRate } from "@/features/decks/review/types";
import { api, type RouterOutputs } from "@/utils/api";

interface ReviewProviderProps {
  card: RouterOutputs["card"]["all"][number];
  isFlipped: boolean;
  flip: () => void;
  review: (rate: TRate) => void;
}

const ReviewCtx = createContext<ReviewProviderProps>({
  card: {} as RouterOutputs["card"]["all"][number],
  isFlipped: false,
  flip: () => void 0,
  review: () => void 0,
});

export const ReviewProvider = ({
  children,
  deck,
}: {
  children: ReactNode;
  deck: NonNullable<RouterOutputs["deck"]["forReview"]>;
}) => {
  const { currentIndex, isFlipped, flip, next } = useReviewStates(
    deck.cards.length,
  );

  const card = deck.cards[currentIndex];

  const { mutate } = api.card.review.useMutation({
    onSuccess() {
      next();
    },
  });

  if (!card) {
    throw new Error("Card not found");
  }
  const review = (rate: TRate) => {
    try {
      mutate({ cardId: card.id, rate });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ReviewCtx.Provider value={{ card, isFlipped, flip, review }}>
      {children}
    </ReviewCtx.Provider>
  );
};

export const useReview = () => {
  const ctx = useContext(ReviewCtx);
  if (!ctx) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return ctx;
};
