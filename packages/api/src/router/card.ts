import { z } from "zod";

import { daysToMilliseconds } from "@memory-mate/utils";

import {
  calculateEasinessFactor,
  getInterval,
  getStreak,
} from "../helpers/review";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const lastReview = await ctx.prisma.cardReview.findFirst({
      where: {
        cardId: input,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const card = await ctx.prisma.card.findUnique({
      where: {
        id: input,
      },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });

    return {
      ...card,
      lastReview,
    };
  }),
  all: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.card.findMany({
        where: {
          deckId: input.deckId,
        },
        include: {
          _count: {
            select: { reviews: true },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        deckId: z.string(),
        front: z.string().min(1),
        back: z.string().min(1),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.card.create({
        data: {
          front: input.front,
          back: input.back,
          dueDate: new Date(),
          deck: {
            connect: {
              id: input.deckId,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        front: z.string().optional(),
        back: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.card.update({
        where: {
          id: input.id,
        },
        data: {
          front: input.front,
          back: input.back,
        },
      });
    }),

  deleteOne: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.card.delete({
      where: {
        id: input,
      },
    });
  }),

  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.card.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),
  review: protectedProcedure
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

      return ctx.prisma.card.update({
        where: {
          id: input.cardId,
        },
        data: {
          dueDate: new Date(Date.now() + daysToMilliseconds(interval)),
          reviews: {
            create: {
              deckReviewId: input.deckReviewId,
              grade: input.grade,
              duration: input.duration,
              easiness,
              streak,
              interval,
            },
          },
        },
      });
    }),
});
