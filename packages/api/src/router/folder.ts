import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const folderRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const folder = await ctx.prisma.folder.findUnique({
      where: {
        id: input,
      },
      include: {
        decks: {
          include: {
            _count: {
              select: { cards: true },
            },
          },
        },
      },
    });
    if (!folder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Folder not found",
      });
    }
    return folder;
  }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.folder.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { decks: true },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.folder.create({
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3).max(50),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.folder.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.folder.delete({
        where: {
          id: input,
        },
      });
    }),
});
