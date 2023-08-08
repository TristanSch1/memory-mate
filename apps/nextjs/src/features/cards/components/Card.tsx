import { type ComponentPropsWithoutRef } from "react";
import { Card as GenericCard } from "@/components/ui/card";
import { type TCard } from "@/features/cards/types";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"div"> & {
  card: TCard;
  editMode?: boolean;
  active?: boolean;
};

const Card = ({ card, editMode, active, className, ...props }: Props) => {
  return (
    <GenericCard
      {...props}
      className={cn(
        className,
        "flex min-h-[300px] select-none items-center justify-center p-4 text-center",
        {
          "animate-wiggle cursor-pointer": editMode,
          "border-primary": active,
        },
      )}
    >
      <div dangerouslySetInnerHTML={{ __html: card.front }} />
    </GenericCard>
  );
};

export default Card;
