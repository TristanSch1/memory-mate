import CardList from "@/features/cards/components/CardList";
import CardListMenuBar from "@/features/cards/components/CardListMenuBar";
import { CardStoreProvider } from "@/features/cards/components/CardsProvider";
import CreateCard from "@/features/cards/components/CreateCard";
import { useDeckContext } from "@/features/decks/stores/DeckProvider";

const CardTabContent = () => {
  const { id: deckId } = useDeckContext();
  return (
    <CardStoreProvider deckId={deckId}>
      <div className={"space-y-4"}>
        <div className={"mb-4 flex items-center justify-between"}>
          <h2 className={"heading text-2xl"}>Cartes</h2>
          <CreateCard />
        </div>
        <CardListMenuBar />
        <CardList />
      </div>
    </CardStoreProvider>
  );
};

export default CardTabContent;
