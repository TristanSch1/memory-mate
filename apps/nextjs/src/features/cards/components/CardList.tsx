import Card from "@/features/cards/components/Card";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { useStore } from "zustand";

const CardList = () => {
  const store = useCardStore();

  const { cards, mode, toggleSelect, selectedCards } = useStore(
    store,
    (state) => ({
      cards: state.cards,
      mode: state.mode,
      toggleSelect: state.toggleSelect,
      selectedCards: state.selectedCards,
    }),
  );

  const editMode = mode === "edit";
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
        <Card
          key={card.id}
          card={card}
          editMode={editMode}
          active={selectedCards.includes(card.id)}
          onClick={editMode ? () => toggleSelect(card.id) : undefined}
        />
      ))}
    </div>
  );
};

export default CardList;
