import { type TCard } from "@/features/cards/types";
import { createStore } from "zustand";

interface CardStoreState {
  mode: "view" | "edit";
  displayMode: "list" | "grid";
  cards: TCard[];
}

interface CardStoreActions {
  setMode: (mode: "view" | "edit") => void;
  toggleMode: () => void;
  setDisplayMode: (mode: "list" | "grid") => void;
}

export type CardStore = ReturnType<typeof createCardStore>;
export const createCardStore = (initProps?: Partial<CardStoreState>) => {
  const DEFAULT_PROPS: CardStoreState = {
    mode: "view",
    displayMode: "list",
    cards: [],
  };

  return createStore<CardStoreState & CardStoreActions>((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setMode: (mode) => set({ mode }),
    toggleMode: () => set({ mode: get().mode === "view" ? "edit" : "view" }),
    setDisplayMode: (displayMode) => set({ displayMode }),
  }));
};
