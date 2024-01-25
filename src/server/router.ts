import { apiProcedure, router } from "./utils";

export const appRouter = router({
  greeting: apiProcedure.query(() => "hello tRPC v10!"),
});

export type AppRouter = typeof appRouter;
