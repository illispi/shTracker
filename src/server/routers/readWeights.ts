import { apiProcedure } from "../utils";

export const readWeights = apiProcedure.query(async ({ ctx }) => {
  const weights = await ctx.db
    .selectFrom("weights")
    .selectAll("weights")
    .execute();

  return weights;
});
