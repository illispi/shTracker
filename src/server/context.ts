import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "./server";

export const createContextInner = async () => {
  return {
    db,
  };
};

export const createContext = async (opts) => {
  const contextInner = await createContextInner();
  return { ...contextInner, req: opts.req, res: opts.resHeaders };
};

export type TRPCContext = inferAsyncReturnType<typeof createContextInner>;
