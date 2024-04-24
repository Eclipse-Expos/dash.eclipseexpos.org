import { createTRPCRouter, publicProcedure, protectedProcedure } from "../api/trpc";

export const exampleRouter = createTRPCRouter({
    sampleMessage: protectedProcedure.query(() => {
        return "sample protected procedure";
    }),
});

export const authRouter = createTRPCRouter({
    validateUser: protectedProcedure.query(() => {
        // todo - would incorporate nextauth
    }),
});