import { useCallback } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useDeck } from "@/features/decks";
import { URLPath } from "@/routes";
import { useTranslation } from "next-i18next";

export const StartReviewButton = () => {
  const { t } = useTranslation("deck");
  const { cardCount, deckId } = useDeck();
  const { push } = useRouter();

  const startReview = useCallback(() => {
    if (cardCount === 0) return alert("No cards to review");
    void push(URLPath.review(deckId));
  }, [cardCount]);
  return (
    <Button size={"lg"} onClick={startReview}>
      {t("review.start")}
    </Button>
  );
};
