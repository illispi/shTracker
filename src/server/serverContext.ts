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
	const contextInner = await createContextInner();
	return {
		...contextInner,
		req: opts.req,
		res: opts.res,
	};
}
export type ContextTrpc = Awaited<ReturnType<typeof createContextInner>>;
