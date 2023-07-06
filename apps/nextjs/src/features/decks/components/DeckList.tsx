import { api } from "~/utils/api";

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
    <div>
      {deckQuery.data?.map((deck) => {
        return (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DeckList;
