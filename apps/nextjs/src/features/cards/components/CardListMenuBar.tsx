import IconButton from "@/components/ui/icon-button";
import CardActions from "@/features/cards/components/CardActions";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { Pencil } from "lucide-react";
import { useStore } from "zustand";

const CardListMenuBar = () => {
  const store = useCardStore();
  const { mode, toggleMode, selectedCards } = useStore(store, (state) => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
    selectedCards: state.selectedCards,
  }));

  return (
    <div className={"flex justify-between border-b p-2"}>
      <IconButton active={mode === "edit"} onClick={toggleMode}>
        <Pencil size={16} />
      </IconButton>
      {selectedCards.length > 0 && (
        <div className={"flex items-center gap-2"}>
          <label className={"text-muted-foreground"}>
            {selectedCards.length} sélectionn
            {selectedCards.length > 1 ? "ées" : "ée"}
          </label>
          <CardActions />
        </div>
      )}
    </div>
  );
};

export default CardListMenuBar;
