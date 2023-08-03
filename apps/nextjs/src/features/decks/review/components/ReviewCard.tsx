import { Card as GenericCard } from "@/components/ui/card";
import { useReview } from "@/features/decks/review";

type Props = {
  isFlipped: boolean;
};
export const ReviewCard = ({ isFlipped }: Props) => {
  const { card } = useReview();
  return (
    <GenericCard
      className={"h-[60vh] w-full select-none p-4"}
      dangerouslySetInnerHTML={{ __html: isFlipped ? card.back : card.front }}
    />
  );
};
