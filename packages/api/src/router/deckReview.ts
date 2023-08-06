import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckReviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ deckId: z.string(), duration: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const gradeAverage = await ctx.prisma.card.aggregate({
        where: {
          deckId: input.deckId,
        },
        _avg: {
          grade: true,
        },
      });
      if (!gradeAverage._avg.grade) {
        throw new Error("No cards in deck");
      }
      return ctx.prisma.deckReview.create({
        data: {
          deckId: input.deckId,
          duration: input.duration,
          gradeAvg: gradeAverage._avg.grade,
        },
      });
    }),
  recap: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ input, ctx }) => {
      const lastReview = await ctx.prisma.deckReview.findFirst({
        where: {
          deckId: input.deckId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const averageReviewDuration = await ctx.prisma.deckReview.aggregate({
        where: {
          deckId: input.deckId,
        },
        _avg: {
          duration: true,
        },
      });

      const totalReviews = await ctx.prisma.deckReview.count({
        where: {
          deckId: input.deckId,
        },
      });

      const gradeAverage = await ctx.prisma.card.aggregate({
        where: {
          deckId: input.deckId,
        },
        _avg: {
          grade: true,
        },
      });

      return {
        lastReview,
        averageReviewDuration: averageReviewDuration._avg.duration,
        totalReviews,
        gradeAverage: gradeAverage._avg.grade,
      };
    }),
});
