import { createContext, useContext, type ReactNode } from "react";
import { useReviewStates } from "@/features/decks/review/hooks/useReviewStates";
import { type TGrade, type TReviewState } from "@/features/decks/review/types";
import { type RouterOutputs } from "@/utils/api";

interface ReviewProviderProps {
  deckId: string;
  card: RouterOutputs["card"]["all"][number];
  isFlipped: boolean;
  flip: () => void;
  review: (rate: TGrade) => void;
  reviewState: TReviewState;
}

const ReviewCtx = createContext<ReviewProviderProps>({
  deckId: "",
  card: {} as RouterOutputs["card"]["all"][number],
  isFlipped: false,
  flip: () => void 0,
  review: () => void 0,
  reviewState: "REVIEWING",
});

export const ReviewProvider = ({
  children,
  deck,
}: {
  children: ReactNode;
  deck: NonNullable<RouterOutputs["deck"]["forReview"]>;
}) => {
  const { isFlipped, flip, reviewState, review, card } = useReviewStates(deck);
  return (
    <ReviewCtx.Provider
      value={{ deckId: deck.id, card, isFlipped, flip, review, reviewState }}
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
