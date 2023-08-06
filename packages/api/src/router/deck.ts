import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.deck.findUnique({
      where: {
        id: input,
      },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });
  }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.deck.create({
        data: {
          name: input.name,
          description: input.description,
          ownerId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.deck.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.deck.delete({
      where: {
        id: input,
      },
    });
  }),

  forReview: protectedProcedure
    .input(
      z.object({
        deckId: z.string(),
        limit: z.number().optional(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.deck.findUnique({
        where: {
          id: input.deckId,
        },
        include: {
          cards: {
            take: input.limit ?? undefined,
          },
        },
      });
    }),

  review: protectedProcedure
    .input(
      z.object({
        deckId: z.string(),
        duration: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.deckReview.create({
        data: {
          deckId: input.deckId,
          duration: input.duration,
        },
      });
    }),
});
