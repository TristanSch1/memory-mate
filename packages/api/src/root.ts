import { authRouter } from "./router/auth";
import { cardRouter } from "./router/card";
import { cardReviewRouter } from "./router/cardReview";
import { deckRouter } from "./router/deck";
import { deckReviewRouter } from "./router/deckReview";
import { folderRouter } from "./router/folder";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  deck: deckRouter,
  folder: folderRouter,
  card: cardRouter,
  auth: authRouter,
  deckReview: deckReviewRouter,
  cardReview: cardReviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
