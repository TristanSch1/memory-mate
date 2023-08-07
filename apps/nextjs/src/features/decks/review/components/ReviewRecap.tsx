import { Loader } from "@/components/ui/loader";
import {
  StatisticSection,
  StatisticSectionItem,
  StatisticSectionProgressItem,
  StatisticSectionTitle,
} from "@/components/ui/statistic-section";
import { useReview } from "@/features/decks/review";
import { Graph } from "@/features/decks/statistics/components/Graph";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

import { formatDeckReviewDuration } from "@memory-mate/utils";

type SessionReviewRecapProps = {
  duration: number;
};
const SessionReviewRecap = ({ duration }: SessionReviewRecapProps) => {
  const { t } = useTranslation("review");
  return (
    <StatisticSection>
      <StatisticSectionTitle>{t("recap.session.title")}</StatisticSectionTitle>
      <StatisticSectionItem
        label={t("recap.session.duration")}
        value={formatDeckReviewDuration(duration)}
      />
    </StatisticSection>
  );
};

type DeckReviewRecapProps = {
  totalReviews: number;
  gradeAverageProgress?: number;
  averageReviewDuration?: number;
  gradeAverage?: number;
};
const DeckReviewRecap = ({
  totalReviews,
  averageReviewDuration,
  gradeAverage,
  gradeAverageProgress = 0,
}: DeckReviewRecapProps) => {
  const { t } = useTranslation("review");

  return (
    <StatisticSection>
      <StatisticSectionTitle>{t("recap.deck.title")}</StatisticSectionTitle>
      <StatisticSectionItem
        label={t("recap.deck.totalReviews")}
        value={totalReviews.toString()}
      />
      <StatisticSectionItem
        label={t("recap.deck.averageReviewDuration")}
        value={
          averageReviewDuration
            ? formatDeckReviewDuration(averageReviewDuration)
            : "-"
        }
      />
      <StatisticSectionItem
        label={t("recap.deck.gradeAverage")}
        value={gradeAverage?.toString() ?? "-"}
      />
      <StatisticSectionProgressItem
        label={t("recap.deck.gradeAverageProgress")}
        value={gradeAverageProgress}
      />
    </StatisticSection>
  );
};
export const ReviewRecap = () => {
  const { deckId } = useReview();
  const { data: recap, isLoading } = api.deckReview.recap.useQuery({ deckId });
  const lastReview = recap?.lastReview;
  if (isLoading) {
    return <Loader />;
  }

  if (!recap || !lastReview) {
    return null;
  }
  console.log(recap);
  return (
    <div className={"w-full space-y-4"}>
      <SessionReviewRecap duration={lastReview?.duration ?? 0} />
      <DeckReviewRecap
        totalReviews={recap.totalReviews}
        averageReviewDuration={recap.averageReviewDuration ?? undefined}
        gradeAverage={recap.gradeAverage ?? undefined}
        gradeAverageProgress={recap.gradeAverageProgress ?? undefined}
      />
      <Graph review={lastReview} />
    </div>
  );
};
