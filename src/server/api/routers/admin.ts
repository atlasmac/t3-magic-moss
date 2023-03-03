import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
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
      // const isAdmin = ctx.prisma.user.upsert({
      //   where: { email: input.email },
      //   create: {
      //     isAdmin: true,
      //   },
      //   update: {
      //     isAdmin: true,
      //   },
      //   select: {
      //     isAdmin: true,
      //   },
      // });
      const isAdmin = ctx.prisma.user.update({
        where: { email: input.email },
        data: {
          isAdmin: true,
        },
      });
      return isAdmin;
    }),
});
