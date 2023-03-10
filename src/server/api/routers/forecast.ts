import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const forecastRouter = createTRPCRouter({
  getForecast: publicProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const forecast = await ctx.prisma.report.findUnique({
        where: { siteId: input.siteId },
        select: {
          siteName: true,
          observation: true,
          forecast: true,
          siteId: true,
        },
      });
      return forecast;
    }),
  getCurrentLevel: publicProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const forecast = await ctx.prisma.report.findUnique({
        where: { siteId: input.siteId },
        select: {
          siteName: true,
          observation: true,
        },
      });
      return forecast;
    }),
  getSiteIds: publicProcedure.query(async ({ ctx }) => {
    const reportIds = await ctx.prisma.report.findMany({
      select: {
        siteId: true,
        siteName: true,
      },
    });
    return reportIds;
  }),
});
