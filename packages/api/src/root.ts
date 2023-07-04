import { authRouter } from "./router/auth";
import { cardRouter } from "./router/card";
import { deckRouter } from "./router/deck";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  deck: deckRouter,
  card: cardRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
