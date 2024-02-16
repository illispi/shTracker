import { apiProcedure, t } from "./approuter";
import { readWeights } from "./routes/weightRoutes";

export const appRouter = t.router({
	greeting: apiProcedure.query(() => "hello tRPC v10!"),
	readWeights,
});

// export type definition of API
export type AppRouter = typeof appRouter;
