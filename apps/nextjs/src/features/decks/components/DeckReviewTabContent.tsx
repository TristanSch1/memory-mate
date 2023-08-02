import { StartReview } from "@/features/decks/review";
import { useTranslation } from "next-i18next";

export const DeckReviewTabContent = () => {
  const { t } = useTranslation("deck");
  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <h2 className={"heading text-2xl"}>{t("review.title")}</h2>
        <label>{}</label>
      </div>
      <StartReview />
    </div>
  );
};
