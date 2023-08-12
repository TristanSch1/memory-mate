import { Card } from "@/components/ui/card";
import { SmallDeckCard } from "@/features/decks";
import { FolderAddDeck } from "@/features/folders/components/FolderAddDeck";
import { Plus } from "lucide-react";
import { useTranslation } from "next-i18next";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  decks: RouterOutputs["folder"]["byId"]["decks"];
};

export const FolderDecks = ({ decks }: Props) => {
  const { t } = useTranslation("folder");

  return (
    <div className={"grid grid-cols-2 gap-2"}>
      {decks.map((deck) => {
        return <SmallDeckCard deck={deck} key={deck.id} />;
      })}
      <FolderAddDeck>
        <Card
          className={
            "hover:border-primary group flex h-full min-h-[80px] w-full cursor-pointer items-center justify-center transition-all"
          }
        >
          <Plus size={32} className={"group-hover:text-primary"} />
        </Card>
      </FolderAddDeck>
    </div>
  );
};
