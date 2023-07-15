import { type TCard } from "@/features/cards/types";
import { createStore } from "zustand";

interface CardStoreState {
  mode: "view" | "edit";
  displayMode: "list" | "grid";
  cards: TCard[];
  selectedCards: string[];
}

interface CardStoreActions {
  setMode: (mode: "view" | "edit") => void;
  toggleMode: () => void;
  setDisplayMode: (mode: "list" | "grid") => void;
  toggleSelect: (id: string) => void;
  select: (id: string) => void;
  unselect: (id: string) => void;
}

export type CardStore = ReturnType<typeof createCardStore>;
export const createCardStore = (initProps?: Partial<CardStoreState>) => {
  const DEFAULT_PROPS: CardStoreState = {
    mode: "view",
    displayMode: "list",
    cards: [],
    selectedCards: [],
  };

  return createStore<CardStoreState & CardStoreActions>((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setMode: (mode) => set({ mode }),
    toggleMode: () => {
      const mode = get().mode === "view" ? "edit" : "view";
      if (mode === "view") set({ selectedCards: [] });
      set({ mode });
    },
    setDisplayMode: (displayMode) => set({ displayMode }),
    toggleSelect: (id) => {
      const isSelected = get().selectedCards.includes(id);
      if (isSelected) {
        get().unselect(id);
      } else {
        get().select(id);
      }
    },
    select: (id) =>
      set({
        selectedCards: [...get().selectedCards, id],
      }),
    unselect: (id) =>
      set({
        selectedCards: get().selectedCards.filter((cardId) => cardId !== id),
      }),
  }));
};
