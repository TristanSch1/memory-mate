import Card from "@/features/cards/components/Card";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { useStore } from "zustand";

const CardList = () => {
  const store = useCardStore();

  const cards = useStore(store, (state) => state.cards);
  const mode = useStore(store, (state) => state.mode);
  if (!cards || cards.length === 0) {
    return (
      <div className={"flex h-full flex-col items-center justify-center"}>
        <p className={"text-muted-foreground"}>Aucune carte</p>
      </div>
    );
  }
  return (
    <div className={"space-y-4"}>
      {cards?.map((card) => (
        <Card key={card.id} card={card} editMode={mode === "edit"} />
      ))}
    </div>
  );
};

export default CardList;
