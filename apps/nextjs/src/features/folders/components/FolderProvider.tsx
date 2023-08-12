import { createContext, useContext } from "react";

const FolderContext = createContext<{ folderId: string }>({ folderId: "" });

export const FolderProvider = FolderContext.Provider;

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error("useFolder must be used within a FolderProvider");
  }
  return context;
};
