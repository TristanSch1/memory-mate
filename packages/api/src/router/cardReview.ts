import { z } from "zod";

import {
  calculateEasinessFactor,
  getInterval,
  getStreak,
} from "../helpers/review";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cardReviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        deckReviewId: z.string(),
        cardId: z.string(),
        grade: z.number(),
        duration: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const lastReview = await ctx.prisma.cardReview.findFirst({
        where: {
          cardId: input.cardId,
        },
      });

      const easiness = calculateEasinessFactor(
        input.grade,
        lastReview?.easiness,
      );

      const interval = getInterval(
        input.grade,
        easiness,
        lastReview?.interval,
        lastReview?.streak,
      );

      const streak = getStreak(input.grade, lastReview?.streak);

      return ctx.prisma.cardReview.create({
        data: {
          deckReviewId: input.deckReviewId,
          cardId: input.cardId,
          grade: input.grade,
          duration: input.duration,
          easiness,
          interval,
          streak,
        },
      });
    }),
});
