import { cardRouter } from "./router/card";
import { deckRouter } from "./router/deck";
import { deckReviewRouter } from "./router/deckReview";
import { folderRouter } from "./router/folder";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  deck: deckRouter,
  folder: folderRouter,
  card: cardRouter,
  user: userRouter,
  deckReview: deckReviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
