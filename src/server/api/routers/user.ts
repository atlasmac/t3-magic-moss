import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  /// example hello
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  addFavorite: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        siteName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const inputs = {
        ...(input.siteId !== undefined && {
          siteId: input.siteId,
        }),
        ...(input.siteName !== undefined && {
          siteId: input.siteName,
        }),
      };
      const createFav = await ctx.prisma.favoriteWave.create({
        data: {
          siteId: input.siteId,
          siteName: input.siteName,
          userId,
        },
      });
      return createFav;
    }),
  getFavorites: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const favorite = await ctx.prisma.favoriteWave.findUnique({
        where: { userId },
        select: {
          siteId: true,
          siteName: true,
        },
      });
      return favorite;
    }),
  deleteFavorite: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.favoriteWave.deleteMany({
        where: {
          userId,
          siteId: input.siteId,
        },
      });
    }),
});
