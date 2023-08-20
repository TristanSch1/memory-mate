import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  StatisticSection,
  StatisticSectionItem,
  StatisticSectionProgressItem,
  StatisticSectionTitle,
} from "@/components/ui/statistic-section";
import { getStatsForGraph, Graph } from "@/features/decks";
import { URLPath } from "@/routes";
import { api, type RouterOutputs } from "@/utils/api";
import { useTranslation } from "next-i18next";

import { formatDuration } from "@memory-mate/utils";

type SessionReviewRecapProps = {
  lastReview: RouterOutputs["deckReview"]["recap"]["lastReview"];
  duration: number;
};
const SessionReviewRecap = ({
  lastReview,
  duration,
}: SessionReviewRecapProps) => {
  const { t } = useTranslation("review");
  const stats = getStatsForGraph(lastReview.cardReviews);
  return (
    <StatisticSection>
      <StatisticSectionTitle>{t("recap.session.title")}</StatisticSectionTitle>
      <StatisticSectionItem
        label={t("recap.session.duration")}
        value={formatDuration(duration)}
      />
      <Graph stats={stats} />
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
          averageReviewDuration ? formatDuration(averageReviewDuration) : "-"
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

type Props = {
  deckId: string;
};
export const ReviewRecap = ({ deckId }: Props) => {
  const { t } = useTranslation("review");
  const { push } = useRouter();
  const { data: recap, isLoading } = api.deckReview.recap.useQuery({ deckId });
  const lastReview = recap?.lastReview;
  if (isLoading) {
    return <Loader />;
  }

  if (!recap || !lastReview) {
    return null;
  }

  const handleBack = () => {
    void push(URLPath.deck(deckId));
  };

  const handleRetry = () => {
    void push(URLPath.review(deckId, lastReview.id));
  };
  return (
    <div className={"w-full space-y-8"}>
      <SessionReviewRecap
        lastReview={lastReview}
        duration={lastReview?.duration ?? 0}
      />
      <DeckReviewRecap
        totalReviews={recap.totalReviews}
        averageReviewDuration={recap.averageReviewDuration ?? undefined}
        gradeAverage={recap.gradeAverage ?? undefined}
        gradeAverageProgress={recap.gradeAverageProgress ?? undefined}
      />
      <div className={"flex gap-4 pt-4"}>
        <Button
          size={"lg"}
          className={"flex-1"}
          variant={"outline"}
          onClick={handleBack}
        >
          {t("recap.back")}
        </Button>
        <Button size={"lg"} className={"flex-1"} onClick={handleRetry}>
          {t("recap.retry")}
        </Button>
      </div>
    </div>
  );
};
