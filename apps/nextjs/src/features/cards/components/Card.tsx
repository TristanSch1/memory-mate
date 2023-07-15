import { type ComponentPropsWithoutRef } from "react";
import { Card as GenericCard } from "@/components/ui/card";
import { type TCard } from "@/features/cards/types";
import { clsx } from "clsx";

type Props = ComponentPropsWithoutRef<"div"> & {
  card: TCard;
  editMode?: boolean;
  active?: boolean;
};

const Card = ({ card, editMode, active, ...props }: Props) => {
  return (
    <GenericCard
      {...props}
      className={clsx("select-none p-4", {
        "animate-wiggle cursor-pointer": editMode,
        "border-primary": active,
      })}
    >
      <div dangerouslySetInnerHTML={{ __html: card.front }} />
    </GenericCard>
  );
};

export default Card;
