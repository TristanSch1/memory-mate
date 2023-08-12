import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton from "@/components/ui/icon-button";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { URLPath } from "@/routes";
import { MoreVertical, WalletCards } from "lucide-react";
import { useTranslation } from "next-i18next";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  deck: RouterOutputs["deck"]["all"][number];
  menuOptions?: {
    label: string;
    onClick: () => void;
  }[];
};

export const SmallDeckCard = ({ deck, menuOptions }: Props) => {
  const { t } = useTranslation("deck");
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
      {menuOptions && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconButton size={"sm"}>
              <MoreVertical size={20} className={"text-muted-foreground"} />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menuOptions.map((option) => (
              <>
                <DropdownMenuItem key={option.label} onClick={option.onClick}>
                  {option.label}
                </DropdownMenuItem>
                <DropdownMenuSeparator className={"last:hidden"} />
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Card>
  );
};
