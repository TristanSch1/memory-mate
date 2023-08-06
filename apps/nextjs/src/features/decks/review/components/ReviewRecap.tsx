import { Loader } from "@/components/ui/loader";
import {
  StatisticSection,
  StatisticSectionItem,
  StatisticSectionTitle,
} from "@/components/ui/statistic-section";
import { useReview } from "@/features/decks/review";
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
export const ReviewRecap = () => {
  const { deckId } = useReview();
  const { data: deckReview, isLoading } = api.deck.lastReview.useQuery({
    deckId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!deckReview) {
    return null;
  }

  return (
    <div className={"w-full"}>
      <SessionReviewRecap duration={deckReview?.duration ?? 0} />
    </div>
  );
};
