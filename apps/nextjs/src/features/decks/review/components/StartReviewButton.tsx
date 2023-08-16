import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";

import { useStartReview } from "../hooks/useStartReview";

type Props = {
  deckId: string;
};
export const StartReviewButton = ({ deckId }: Props) => {
  const { t } = useTranslation("deck");
  const { startReview } = useStartReview(deckId);

  return (
    <Button size={"lg"} onClick={startReview}>
      {t("review.start")}
    </Button>
  );
};
