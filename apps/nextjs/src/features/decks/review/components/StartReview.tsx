import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useDeck } from "@/features/decks";
import { useTranslation } from "next-i18next";

export const StartReview = () => {
  const { t } = useTranslation("deck");
  const { cardCount } = useDeck();

  const startReview = useCallback(() => {
    if (cardCount === 0) return alert("No cards to review");
    console.log("start review");
  }, [cardCount]);
  return (
    <Button size={"lg"} onClick={startReview}>
      {t("review.start")}
    </Button>
  );
};
