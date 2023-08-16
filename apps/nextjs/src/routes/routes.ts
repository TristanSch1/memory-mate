export const URLPath = {
  home: "/",
  deck: (deckId: string, tab?: "review" | "cards") =>
    `/deck/${deckId}${tab ? `?tab=${tab}` : ""}`,
  review: (deckId: string, reviewId: string) =>
    `/deck/${deckId}/review/${reviewId}`,
  reviewRecap: (deckId: string, reviewId: string) =>
    `/deck/${deckId}/review/${reviewId}/recap`,
  folders: "/folders",
  folder: (folderId: string) => `/folders/${folderId}`,
};
