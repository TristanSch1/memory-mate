export const URLPath = {
  home: "/",
  deck: (deckId: string) => `/deck/${deckId}`,
  review: (deckId: string) => `/deck/${deckId}/review`,
  folders: "/folders",
  folder: (folderId: string) => `/folders/${folderId}`,
};
