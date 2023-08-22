import Error from "next/error";
import {
  StatisticSection,
  StatisticSectionItem,
  StatisticSectionTitle,
} from "@/components/ui/statistic-section";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

import { formatDuration } from "@memory-mate/utils";

type Props = {
  userId: string;
};

export const UserStatistics = ({ userId }: Props) => {
  const { data: stats } = api.user.stats.useQuery({ userId });
  const { t } = useTranslation("profile");

  if (!stats) return <Error statusCode={404} />;
  return (
    <StatisticSection>
      <StatisticSectionTitle>{t("stats.title")}</StatisticSectionTitle>
      <StatisticSectionItem
        label={t("stats.deckCount")}
        value={stats.deckCount.toString()}
      />
      <StatisticSectionItem
        label={t("stats.cardCount")}
        value={stats.cardCount.toString()}
      />
      <StatisticSectionItem
        label={t("stats.reviewCount")}
        value={stats.reviewCount.toString()}
      />
      <StatisticSectionItem
        label={t("stats.todayReviewCount")}
        value={stats.todayReviewCount.toString()}
      />
      <StatisticSectionItem
        label={t("stats.totalTimesReviewed")}
        value={
          stats.totalTimesReviewed
            ? formatDuration(stats.totalTimesReviewed)
            : undefined
        }
      />
    </StatisticSection>
  );
};
