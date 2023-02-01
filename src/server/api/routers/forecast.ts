import { copyFileSync } from "fs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const forecastRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getForecast: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const forecast = await ctx.prisma.report.findUnique({
        where: { siteId: input.siteId },
        select: {
          observation: true,
          forecast: true,
          siteId: true,
        },
      });
      return forecast;
    }),
});
