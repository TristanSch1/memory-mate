import { z } from "zod";

import { formatGradeAverage, getGradeAverageProgress } from "../helpers/review";
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
          gradeAvg: formatGradeAverage(gradeAverage._avg.grade),
        },
      });
    }),
  recap: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ input, ctx }) => {
      const lastReviews = await ctx.prisma.deckReview.findMany({
        take: 2,
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
        lastReview: lastReviews[0],
        averageReviewDuration: averageReviewDuration._avg.duration,
        totalReviews,
        gradeAverage: gradeAverage._avg.grade
          ? formatGradeAverage(gradeAverage._avg.grade)
          : null,
        gradeAverageProgress: getGradeAverageProgress(
          lastReviews?.[1].gradeAvg ?? 0,
          lastReviews[0].gradeAvg,
        ),
      };
    }),
});
