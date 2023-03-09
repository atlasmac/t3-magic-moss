import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  getAdmins: protectedProcedure
    .input(
      z.object({
        admin: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          isAdmin: input.admin,
        },
        select: {
          name: true,
          email: true,
        },
      });
      return users;
    }),
  makeUserAdmin: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const isAdmin = ctx.prisma.user.update({
        where: { email: input.email },
        data: {
          isAdmin: true,
        },
      });
      return isAdmin;
    }),
  removeAdmin: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const isAdmin = ctx.prisma.user.update({
        where: { email: input.email },
        data: {
          isAdmin: false,
        },
      });
      return isAdmin;
    }),
  getLatLon: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const coords = ctx.prisma.latLon.findUnique({
        where: { siteId: input.siteId },
        select: {
          lat: true,
          lon: true,
        },
      });
      return coords;
    }),
  updateLatLon: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        lat: z.number(),
        lon: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const siteId = input.siteId;
      const inputs = {
        ...(input.lat !== undefined && {
          lat: input.lat,
        }),
        ...(input.lon !== undefined && {
          lon: input.lon,
        }),
      };

      const latlonForm = ctx.prisma.latLon.upsert({
        where: { siteId },
        update: { ...inputs },
        create: {
          report: {
            connect: {
              siteId,
            },
          },
          ...inputs,
        },
        select: { lat: true, lon: true },
      });
      return latlonForm;
    }),
});
