import { createContext, useContext, type ReactNode } from "react";

const DeckContext = createContext<{ deckId: string; cardCount: number }>({
  deckId: "",
  cardCount: 0,
});

export const DeckProvider = ({
  deckId,
  cardCount,
  children,
}: {
  deckId: string;
  cardCount: number;
  children: ReactNode;
}) => {
  return (
    <DeckContext.Provider value={{ deckId, cardCount }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const ctx = useContext(DeckContext);
  if (!ctx) {
    throw new Error("useDeck must be used within a DeckProvider");
  }

  return ctx;
};
