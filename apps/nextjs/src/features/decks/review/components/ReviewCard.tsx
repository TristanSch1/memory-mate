import { useReview } from "@/features/decks/review";

type Props = {
  isFlipped: boolean;
};
export const ReviewCard = ({ isFlipped }: Props) => {
  const { card } = useReview();
  return (
    <div
      dangerouslySetInnerHTML={{ __html: isFlipped ? card.back : card.front }}
    />
  );
};
