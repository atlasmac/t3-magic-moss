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
          giph: true,
          range: true,
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
  getLocation: publicProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const locations = await ctx.prisma.latLon.findUnique({
        where: { siteId: input.siteId },
        select: {
          lat: true,
          lon: true,
          location: true,
        },
      });
      return locations;
    }),
  // getGif: publicProcedure
  //   .input(
  //     z.object({
  //       siteId: z.string(),
  //     })
  //   )
  //   .query(async ({ input, ctx }) => {
  //     const locations = await ctx.prisma.report.findUnique({
  //       where: { siteId: input.siteId },
  //       select: {
  //         lat: true,
  //         lon: true,
  //         location: true,
  //       },
  //     });
  //     return locations;
  //   }),
});
