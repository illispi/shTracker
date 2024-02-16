import { initTRPC } from "@trpc/server";
import { type ContextTrpc } from "./serverContext";
import { readWeights } from "./routes/weightRoutes";

export const t = initTRPC.context<ContextTrpc>().create();

//NOTE look in trpc example projects how to fix ts

export const publicProcedure = t.procedure;
export const apiProcedure = publicProcedure.use((opts) => {
	if (!opts.ctx.req || !opts.ctx.res) {
		throw new Error("You are missing `req` or `res` in your call.");
	}
	return opts.next({
		ctx: {
			// We overwrite the context with the truthy `req` & `res`, which will also overwrite the types used in your procedure.
			req: opts.ctx.req,
			res: opts.ctx.res,
		},
	});
});

export const appRouter = t.router({
	greeting: apiProcedure.query(() => "hello tRPC v10!"),
	readWeights,
});

// export type definition of API
export type AppRouter = typeof appRouter;
