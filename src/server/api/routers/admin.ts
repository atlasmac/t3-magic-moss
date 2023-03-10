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
  getLocation: protectedProcedure
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
          location: true,
        },
      });
      return coords;
    }),
  updateLocation: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        lat: z.number(),
        lon: z.number(),
        location: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const siteId = input.siteId;

      const latlonForm = ctx.prisma.latLon.upsert({
        where: { siteId },
        update: { lat: input.lat, lon: input.lon, location: input.location },
        create: {
          report: {
            connect: {
              siteId,
            },
          },
          lon: input.lon,
          lat: input.lat,
          location: input.location,
        },
        select: { lat: true, lon: true, location: true },
      });
      return latlonForm;
    }),
});
