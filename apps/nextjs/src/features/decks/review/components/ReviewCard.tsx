import { Card as GenericCard } from "@/components/ui/card";
import { type TCard } from "@/features/cards/types";

type Props = {
  card: TCard;
  isFlipped: boolean;
};
export const ReviewCard = ({ card, isFlipped }: Props) => {
  return (
    <GenericCard
      className={"h-[60vh] w-full select-none p-4 sm:p-6"}
      dangerouslySetInnerHTML={{ __html: isFlipped ? card.back : card.front }}
    />
  );
};
