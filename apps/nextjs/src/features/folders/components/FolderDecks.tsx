import { Card } from "@/components/ui/card";
import { SmallDeckCard } from "@/features/decks";
import { useFolder } from "@/features/folders";
import { FolderAddDeck } from "@/features/folders/components/FolderAddDeck";
import { api } from "@/utils/api";
import { Plus } from "lucide-react";
import { useTranslation } from "next-i18next";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  decks: RouterOutputs["folder"]["byId"]["decks"];
};

export const FolderDecks = ({ decks }: Props) => {
  const { folderId } = useFolder();
  const { t } = useTranslation("folder");
  const utils = api.useContext();
  const { mutate } = api.folder.removeDeck.useMutation({
    onSuccess: async () => {
      await utils.folder.byId.invalidate(folderId);
    },
  });
  const handleRemove = (deckId: string) => {
    try {
      mutate({ folderId, deckId });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className={
        "xs:grid-cols-2 grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      }
    >
      {decks.map((deck) => {
        return (
          <SmallDeckCard
            deck={deck}
            key={deck.id}
            menuOptions={[
              {
                label: t("removeDeck"),
                onClick: () => handleRemove(deck.id),
              },
            ]}
          />
        );
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
