import IconButton from "@/components/ui/icon-button";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { Pencil } from "lucide-react";
import { useStore } from "zustand";

const CardListMenuBar = () => {
  const store = useCardStore();
  const { mode, toggleMode } = useStore(store, (state) => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
  }));

  return (
    <div className={"flex border-b p-2"}>
      <IconButton active={mode === "edit"} onClick={toggleMode}>
        <Pencil size={16} />
      </IconButton>
    </div>
  );
};

export default CardListMenuBar;
