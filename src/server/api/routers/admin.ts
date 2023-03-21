import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  getRange: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const range = ctx.prisma.range.findUnique({
        where: { siteId: input.siteId },
        select: {
          bottomRange: true,
          topRange: true,
        },
      });
      return range;
    }),
  updateRange: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        bottomRange: z.number(),
        topRange: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const siteId = input.siteId;

      const rangeForm = ctx.prisma.range.upsert({
        where: { siteId },
        update: { bottomRange: input.bottomRange, topRange: input.topRange },
        create: {
          report: {
            connect: {
              siteId,
            },
          },
          bottomRange: input.bottomRange,
          topRange: input.topRange,
        },
        select: { bottomRange: true, topRange: true },
      });
      return rangeForm;
    }),
  getGiph: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const range = ctx.prisma.report.findUnique({
        where: { siteId: input.siteId },
        select: {
          giph: true,
        },
      });
      return range;
    }),
  updateGiph: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        giph: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const siteId = input.siteId;

      const updateGiph = ctx.prisma.report.update({
        where: { siteId },
        data: {
          giph: input.giph,
        },
      });
      return updateGiph;
    }),
  getRiverConditions: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const riverConditions = ctx.prisma.riverConditions.findMany({
        where: {
          siteId: input.siteId,
        },
        select: {
          cfs: true,
          condition: true,
          id: true,
        },
        orderBy: {
          cfs: "asc",
        },
      });
      return riverConditions;
    }),
  updateRiverConditions: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        conditions: z
          .object({
            id: z.string().optional(),
            cfs: z.number().gt(0),
            condition: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updates = input.conditions.filter((e) => e.id);
      const creates = input.conditions.filter((e) => !e.id);
      const res = await ctx.prisma.$transaction([
        ...updates.map((e) => {
          return ctx.prisma.riverConditions.update({
            where: { id: e.id },
            data: { cfs: e.cfs, condition: e.condition },
          });
        }),
        ...creates.map((e) => {
          return ctx.prisma.riverConditions.create({
            data: { cfs: e.cfs, condition: e.condition, siteId: input.siteId },
          });
        }),
      ]);
    }),
  deleteCondition: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.riverConditions.delete({
        where: { id: input.id },
      });
    }),
});
