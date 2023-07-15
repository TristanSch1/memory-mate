import { Card as GenericCard } from "@/components/ui/card";
import { type TCard } from "@/features/cards/types";
import { clsx } from "clsx";

type Props = {
  card: TCard;
  editMode?: boolean;
};

const Card = ({ card, editMode }: Props) => {
  return (
    <GenericCard
      className={clsx("p-4", {
        "animate-wiggle cursor-pointer": editMode,
      })}
    >
      <div dangerouslySetInnerHTML={{ __html: card.front }} />
    </GenericCard>
  );
};

export default Card;
