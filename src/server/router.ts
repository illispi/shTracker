import { readWeights } from "./routers/readWeights";
import { apiProcedure, router } from "./utils";

export const appRouter = router({
  greeting: apiProcedure.query(() => "hello tRPC v10!"),
  readWeights,
});

export type AppRouter = typeof appRouter;
