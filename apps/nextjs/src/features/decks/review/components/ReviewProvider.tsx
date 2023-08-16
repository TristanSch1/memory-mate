import { createContext, useContext, type ReactNode } from "react";
import { type RouterOutputs } from "@/utils/api";

import { useReviewStates } from "../hooks/useReviewStates";
import { type TGrade } from "../types";

interface ReviewProviderProps {
  deckId: string;
  card: RouterOutputs["card"]["all"][number];
  isFlipped: boolean;
  flip: () => void;
  review: (rate: TGrade) => void;
}

const ReviewCtx = createContext<ReviewProviderProps>({
  deckId: "",
  card: {} as RouterOutputs["card"]["all"][number],
  isFlipped: false,
  flip: () => void 0,
  review: () => void 0,
});

export const ReviewProvider = ({
  children,
  deck,
  deckReview,
}: {
  children: ReactNode;
  deck: NonNullable<RouterOutputs["deck"]["forReview"]>;
  deckReview: NonNullable<RouterOutputs["deckReview"]["create"]>;
}) => {
  const { isFlipped, flip, review, card } = useReviewStates(deck, deckReview);
  return (
    <ReviewCtx.Provider
      value={{ deckId: deck.id, card, isFlipped, flip, review }}
    >
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
