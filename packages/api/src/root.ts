import { authRouter } from "./router/auth";
import { deckRouter } from "./router/deck";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  deck: deckRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
