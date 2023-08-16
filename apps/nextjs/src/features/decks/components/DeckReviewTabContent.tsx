import {
  StatisticSection,
  StatisticSectionItem,
  StatisticSectionTitle,
} from "@/components/ui/statistic-section";
import {
  getStatsForGraph,
  Graph,
  StartReviewButton,
  useDeck,
} from "@/features/decks";
import { useTranslation } from "next-i18next";

import { formatDeckReviewDuration } from "@memory-mate/utils";

export const DeckReviewTabContent = () => {
  const { t } = useTranslation("deck");
  const { deck } = useDeck();
  const cardReviews = deck.cards
    .map((card) => card.reviews?.[0])
    .filter(Boolean);
  const graphStats = getStatsForGraph(cardReviews);
  return (
    <div>
      <div className={"flex flex-col items-start gap-6 lg:flex-row lg:gap-12"}>
        <StatisticSection className={"flex-1"}>
          <StatisticSectionTitle>{t("stats.title")}</StatisticSectionTitle>
          <StatisticSectionItem
            label={t("stats.totalReviews")}
            value={deck._count.reviews.toString()}
          />
          <StatisticSectionItem
            label={t("stats.averageReviewTime")}
            value={
              deck.avgDeckReviewDuration
                ? formatDeckReviewDuration(deck.avgDeckReviewDuration)
                : "-"
            }
          />
          <StatisticSectionItem
            label={t("stats.todayReviews")}
            value={deck.todayReviewCount.toString()}
          />
          <StatisticSectionItem
            label={t("stats.totalCards")}
            value={deck.cards.length.toString()}
          />
        </StatisticSection>
        <StatisticSection className={"flex-1"}>
          <StatisticSectionTitle>
            {t("stats.graph.title")}
          </StatisticSectionTitle>
          <Graph stats={graphStats} />
        </StatisticSection>
      </div>
      <div className={"flex items-center justify-between"}>
        <h2 className={"heading text-2xl"}>{t("review.title")}</h2>
        <label>{}</label>
      </div>
      <StartReviewButton deckId={deck.id} />
    </div>
  );
};
