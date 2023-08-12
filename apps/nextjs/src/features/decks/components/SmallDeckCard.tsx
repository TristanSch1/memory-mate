import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { URLPath } from "@/routes";
import dayjs from "dayjs";
import { PenSquare, WalletCards } from "lucide-react";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  deck: RouterOutputs["deck"]["all"][number];
};

export const SmallDeckCard = ({ deck }: Props) => {
  return (
    <Card
      className={
        "hover:border-primary relative flex cursor-pointer items-start justify-between transition-all"
      }
    >
      <Link href={URLPath.deck(deck.id)} className={"block flex-1"}>
        <CardHeader>
          <CardTitle>{deck.name}</CardTitle>
        </CardHeader>
        <CardFooter className={"space-x-2"}>
          <IconWithLabel label={deck._count.cards} icon={WalletCards} />
          <IconWithLabel
            label={dayjs(deck.createdAt).fromNow()}
            icon={PenSquare}
          />
        </CardFooter>
      </Link>
    </Card>
  );
};
