import CardEdit from "@/features/cards/components/CardEdit";
import CardList from "@/features/cards/components/CardList";
import CardListMenuBar from "@/features/cards/components/CardListMenuBar";
import { CardStoreProvider } from "@/features/cards/components/CardsProvider";
import CreateCard from "@/features/cards/components/CreateCard";
import { useDeck } from "@/features/decks/components/DeckProvider";
import { useTranslation } from "next-i18next";

export const CardTabContent = () => {
  const { t } = useTranslation("deck");
  const { deckId } = useDeck();
  return (
    <CardStoreProvider deckId={deckId}>
      <div className={"space-y-4"}>
        <div className={"mb-4 flex items-center justify-between"}>
          <h2 className={"heading text-2xl"}>{t("cards")}</h2>
          <CreateCard />
        </div>
        <CardListMenuBar />
        <CardList />
      </div>
      <CardEdit />
    </CardStoreProvider>
  );
};
