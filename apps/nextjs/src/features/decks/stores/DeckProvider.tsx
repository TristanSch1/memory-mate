import { createContext, useContext, type ReactNode } from "react";

const DeckContext = createContext<{ id: string }>({ id: "" });

export const useDeckContext = () => {
  return useContext(DeckContext);
};

export const DeckProvider = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  return <DeckContext.Provider value={{ id }}>{children}</DeckContext.Provider>;
};
