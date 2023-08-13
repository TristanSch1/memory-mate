import { type ComponentPropsWithoutRef } from "react";
import { Card as GenericCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { type TCard } from "../types";

type Props = ComponentPropsWithoutRef<"div"> & {
  card: TCard;
  editMode?: boolean;
  active?: boolean;
};

export const Card = ({
  card,
  editMode,
  active,
  className,
  ...props
}: Props) => {
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
