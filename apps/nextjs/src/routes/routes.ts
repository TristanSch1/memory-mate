export const URLPath = {
  home: "/",
  deck: (deckId: string, tab?: "review" | "cards") =>
    `/deck/${deckId}${tab ? `?tab=${tab}` : ""}`,
  review: (deckId: string) => `/deck/${deckId}/review`,
  folders: "/folders",
  folder: (folderId: string) => `/folders/${folderId}`,
};
