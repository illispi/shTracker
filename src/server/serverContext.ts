import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import { db } from "./db";

export const createContextInner = async () => {
  return {
    db,
  };
};

interface CreateInnerContextOptions
  extends Partial<NodeHTTPCreateContextFnOptions<Request, Response>> {
  db: typeof db;
}

export async function createContext(opts: CreateInnerContextOptions) {
  return {
    ...createContextInner,
    req: opts.req,
    res: opts.res,
  };
}
export type Context = Awaited<ReturnType<typeof createContextInner>>;
