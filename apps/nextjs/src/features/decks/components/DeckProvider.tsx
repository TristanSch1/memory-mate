import { createContext, useContext, type ReactNode } from "react";

import { type RouterOutputs } from "@memory-mate/api";

type DeckContextType = {
  deck: RouterOutputs["deck"]["byId"];
};
const DeckContext = createContext<DeckContextType>({
  deck: {} as DeckContextType["deck"],
});

export const DeckProvider = ({
  deck,
  children,
}: DeckContextType & { children: ReactNode }) => {
  return (
    <DeckContext.Provider value={{ deck }}>{children}</DeckContext.Provider>
  );
};

export const useDeck = () => {
  const ctx = useContext(DeckContext);
  if (!ctx) {
    throw new Error("useDeck must be used within a DeckProvider");
  }

  return ctx;
};
