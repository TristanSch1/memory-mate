import { createContext, useContext, useState } from "react";
import { type RouterOutputs } from "@/utils/api";

interface ReviewProviderProps {
  card: RouterOutputs["card"]["all"][number];
  setCurrentIndex: (index: number) => void;
}

const ReviewCtx = createContext<ReviewProviderProps>({
  card: {} as RouterOutputs["card"]["all"][number],
  setCurrentIndex: () => void 0,
});

export const ReviewProvider = ({
  children,
  deck,
}: {
  children: React.ReactNode;
  deck: RouterOutputs["deck"]["forReview"];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = deck?.cards[currentIndex];

  if (!card) {
    throw new Error("Card not found");
  }

  return (
    <ReviewCtx.Provider value={{ card, setCurrentIndex }}>
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
