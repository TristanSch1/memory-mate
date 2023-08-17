import { type TCard } from "@/features/cards";
import { useModal } from "@/providers/ModalProvider";
import { useStore } from "zustand";

import { Card } from "./Card";
import { useCardStore } from "./CardsProvider";

const CardList = () => {
  const store = useCardStore();
  const { open, close } = useModal();
  const { cards, mode, toggleSelect, selectedCards } = useStore(
    store,
    (state) => ({
      cards: state.cards,
      mode: state.mode,
      toggleSelect: state.toggleSelect,
      selectedCards: state.selectedCards,
      setEditingCardId: state.setEditingCardId,
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

  const handleEdit = (card: TCard) => {
    open("editCard", { card, onSuccess: close });
  };
  return (
    <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
      {cards?.map((card) => (
        <Card
          key={card.id}
          className={
            "card-hover h-[300px] text-sm sm:h-[375px] sm:text-base md:h-[450px]"
          }
          card={card}
          editMode={editMode}
          active={selectedCards.includes(card.id)}
          onClick={
            editMode ? () => toggleSelect(card.id) : () => handleEdit(card)
          }
        />
      ))}
    </div>
  );
};

export default CardList;
