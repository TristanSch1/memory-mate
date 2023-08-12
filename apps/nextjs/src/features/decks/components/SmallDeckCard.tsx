import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { URLPath } from "@/routes";
import { WalletCards } from "lucide-react";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  deck: RouterOutputs["deck"]["all"][number];
};

export const SmallDeckCard = ({ deck }: Props) => {
  return (
    <Card
      className={
        "hover:border-primary relative flex cursor-pointer items-start justify-between p-2 transition-all"
      }
    >
      <Link href={URLPath.deck(deck.id)} className={"space-y-4"}>
        <CardTitle className={"heading text-base sm:text-lg"}>
          {deck.name}
        </CardTitle>
        <IconWithLabel label={deck._count.cards} icon={WalletCards} />
      </Link>
    </Card>
  );
};
