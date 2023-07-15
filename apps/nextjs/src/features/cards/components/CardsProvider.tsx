import { createContext, useContext, type ReactNode } from "react";
import {
  createCardStore,
  type CardStore,
} from "@/features/cards/stores/cardStore";
import { api } from "@/utils/api";

const CardStoreContext = createContext<CardStore | null>(null);

export const CardStoreProvider = ({
  children,
  deckId,
}: {
  children: ReactNode;
  deckId: string;
}) => {
  const cards = api.card.all.useQuery({ deckId })?.data ?? [];
  const cardStore = createCardStore({ cards });
  return (
    <CardStoreContext.Provider value={cardStore}>
      {children}
    </CardStoreContext.Provider>
  );
};
export const useCardStore = () => {
  const cardStore = useContext(CardStoreContext);
  if (!cardStore) {
    throw new Error("useCardStore must be used within a CardStoreProvider");
  }
  return cardStore;
};
