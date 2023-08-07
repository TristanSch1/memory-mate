import { type TCard } from "@/features/cards/types";
import { clsx } from "clsx";

type Props = {
  card: TCard;
  isFlipped: boolean;
};

export const ReviewCard = ({ card, isFlipped }: Props) => {
  return (
    <div className={"perspective h-[60vh] w-full select-none bg-transparent"}>
      <div
        className={clsx("preserve-3d relative h-full w-full", {
          "rotate-y-180 transition-transform duration-500": isFlipped,
        })}
      >
        <div
          className={"flip-card-front bg-white"}
          dangerouslySetInnerHTML={{ __html: card.front }}
        />
        <div
          className={"flip-card-back rotate-y-180 bg-neutral-100"}
          dangerouslySetInnerHTML={{ __html: card.back }}
        />
      </div>
    </div>
  );
};
