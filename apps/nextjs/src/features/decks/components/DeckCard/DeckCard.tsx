import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { DeckOptionsDropdown } from "@/features/decks";
import { URLPath } from "@/routes";
import dayjs from "dayjs";
import { MoreVertical, PenSquare, WalletCards } from "lucide-react";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  deck: RouterOutputs["deck"]["all"][number];
};

export const DeckCard = ({ deck }: Props) => {
  return (
    <Card
      className={
        "hover:border-primary relative flex cursor-pointer items-start justify-between transition-all"
      }
    >
      <Link href={URLPath.deck(deck.id)} className={"block flex-1"}>
        <CardHeader>
          <CardTitle>{deck.name}</CardTitle>
          <CardDescription>{deck.description}</CardDescription>
        </CardHeader>
        <CardFooter className={"space-x-2"}>
          <IconWithLabel label={deck._count.cards} icon={WalletCards} />
          <IconWithLabel
            label={dayjs(deck.createdAt).fromNow()}
            icon={PenSquare}
          />
        </CardFooter>
      </Link>
      <div className={"absolute right-4 top-4"}>
        <DeckOptionsDropdown>
          <MoreVertical
            className={"text-neutral-500 group-hover:text-neutral-950"}
          />
        </DeckOptionsDropdown>
      </div>
    </Card>
  );
};
