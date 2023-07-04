import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const deckRouter = createTRPCRouter({
  byId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.deck.findUnique({
      where: {
        id: input,
      },
    });
  }),
  all: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      return [];
    }
    return ctx.prisma.deck.findMany({
      where: {
        ownerId: userId,
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error("Cannot create deck without being logged in");
      }
      return ctx.prisma.deck.create({
        data: {
          name: input.name,
          description: input.description,
          ownerId: userId,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error("Cannot update deck without being logged in");
      }
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

  delete: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.deck.delete({
      where: {
        id: input,
      },
    });
  }),
});
