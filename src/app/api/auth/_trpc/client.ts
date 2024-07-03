import { createTRPCRouter } from "@/app/server/api/trpc";
import { exampleRouter } from "@/app/server/routers/procedures";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  // add other routers
});

export type AppRouter = typeof appRouter;
