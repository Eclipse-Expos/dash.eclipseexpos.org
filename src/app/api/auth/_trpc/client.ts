import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/routers/procedures";

export const appRouter = createTRPCRouter({
    example: exampleRouter,
    // add other routers
});
export type AppRouter = typeof appRouter;