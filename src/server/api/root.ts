import { createTRPCRouter } from "./trpc";
import { forecastRouter } from "./routers/forecast";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  forecast: forecastRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
