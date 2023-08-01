import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.card.findUnique({
      where: {
        id: input,
      },
      include: {
        reviews: true,
      },
    });
  }),
  all: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.card.findMany({
        where: {
          deckId: input.deckId,
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
          deckId: input.deckId,
          front: input.front,
          back: input.back,
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
});
