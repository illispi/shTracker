import { TRPCError, initTRPC } from "@trpc/server";
import type { TRPCContext } from "./context";

export const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
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

