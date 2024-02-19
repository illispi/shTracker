import { apiProcedure } from "../approuter";

export const readWeights = apiProcedure.query(async ({ ctx }) => {
	const weights = await ctx.db
		.selectFrom("weight")
		.selectAll("weight")
		.orderBy("id asc")
		.execute();

	return weights;
});
