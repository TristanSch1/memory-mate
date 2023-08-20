import z from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  stats: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const deckCount = await ctx.prisma.deck.count({
        where: {
          ownerId: input.userId,
        },
      });
      const cardCount = await ctx.prisma.card.count({
        where: {
          deck: {
            ownerId: input.userId,
          },
        },
      });
      const reviewCount = await ctx.prisma.deckReview.count({
        where: {
          deck: {
            ownerId: input.userId,
          },
        },
      });

      return {
        deckCount,
        cardCount,
        reviewCount,
      };
    }),
});
