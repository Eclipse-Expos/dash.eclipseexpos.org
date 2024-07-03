import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "../routers/procedures";

/**
 * primary router
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
