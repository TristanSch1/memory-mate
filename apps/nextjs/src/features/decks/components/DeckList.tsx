import { api } from "@/utils/api";
import DeckCard from "@/features/decks/components/DeckCard";

const DeckList = () => {
  const deckQuery = api.deck.all.useQuery();
  if (deckQuery.status === "loading") {
    return <div>Chargement...</div>;
  }

  if (deckQuery.data?.length === 0) {
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        Aucun deck pour le moment
      </div>
    );
  }
  return (
    <div className={"space-y-4"}>
      {deckQuery.data?.map((deck) => {
        return (
          <DeckCard deck={deck} key={deck.id} />
        );
      })}
    </div>
  );
};

export default DeckList;
