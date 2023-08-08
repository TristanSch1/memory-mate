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
      return ctx.prisma.deckReview.create({
        data: {
          deckId: input.deckId,
          duration: input.duration,
          gradeAvg: formatGradeAverage(gradeAverage._avg.grade || 0),
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        deckReviewId: z.string(),
        deckId: z.string(),
        duration: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const gradeAverage = await ctx.prisma.cardReview.aggregate({
        where: {
          deckReviewId: input.deckReviewId,
        },
        _avg: {
          grade: true,
        },
      });
      return ctx.prisma.deckReview.update({
        where: {
          id: input.deckReviewId,
        },
        data: {
          duration: input.duration,
          gradeAvg: formatGradeAverage(gradeAverage._avg.grade || 0),
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
        include: {
          cardReviews: {
            orderBy: {
              createdAt: "desc",
            },
          },
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

      const gradeAverage = await ctx.prisma.cardReview.aggregate({
        where: {
          deckReviewId: lastReviews[0].id,
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
