import { useState } from "react";

export const useCardList = () => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [displayMode, setDisplayMode] = useState<"list" | "grid">("list");

  return {
    mode,
    setMode,
    displayMode,
    setDisplayMode,
  };
};
