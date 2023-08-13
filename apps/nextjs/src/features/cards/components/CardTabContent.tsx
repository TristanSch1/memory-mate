import { Button } from "@/components/ui/button";
import { useDeck } from "@/features/decks";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";

import CardList from "./CardList";
import CardListMenuBar from "./CardListMenuBar";
import { CardStoreProvider } from "./CardsProvider";

export const CardTabContent = () => {
  const { t } = useTranslation("card");
  const { deckId } = useDeck();
  const { open } = useModal();
  const handleNew = () => {
    open("createCard", { deckId });
  };
  return (
    <CardStoreProvider deckId={deckId}>
      <div className={"space-y-4"}>
        <div className={"mb-4 flex items-center justify-between"}>
          <h2 className={"heading text-2xl"}>{t("cards")}</h2>
          <Button variant={"ghost"} onClick={handleNew}>
            {t("create.button")}
          </Button>
        </div>
        <CardListMenuBar />
        <CardList />
      </div>
    </CardStoreProvider>
  );
};
