import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const lastReview = await ctx.prisma.deckReview.findFirst({
      where: {
        deckId: input,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const deck = await ctx.prisma.deck.findUnique({
      where: {
        id: input,
      },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });
    if (!deck) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Deck not found",
      });
    }
    return {
      ...deck,
      lastReview,
    };
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
});
