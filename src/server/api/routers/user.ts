import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  addFavorite: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        siteName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const createFav = await ctx.prisma.favoriteWave.create({
        data: {
          siteId: input.siteId,
          siteName: input.siteName,
          userId,
        },
      });
      return createFav;
    }),
  getAllFavorites: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const favorite = await ctx.prisma.favoriteWave.findMany({
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
