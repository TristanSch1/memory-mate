import { authRouter } from "./router/auth";
import { cardRouter } from "./router/card";
import { deckRouter } from "./router/deck";
import { deckReviewRouter } from "./router/deckReview";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  deck: deckRouter,
  card: cardRouter,
  auth: authRouter,
  deckReview: deckReviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
