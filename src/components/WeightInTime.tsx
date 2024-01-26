import { Show, type Component } from "solid-js";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../server/router";

type RouterOutput = inferRouterOutputs<AppRouter>;

type WeightsDates = RouterOutput["readWeights"];

const WeightInTime: Component<{
  weeks: number;
  weightsDates: WeightsDates;
  text: string;
}> = (props) => {
  const lostOrGained = (weeks: number, weightsDates: WeightsDates) => {
    if (weeks === 1) {
      if (weightsDates.length < 2) {
        return false;
      } else {
        const result =
          Number(weightsDates[weightsDates.length - 1].weight) -
          Number(weightsDates[weightsDates.length - 2].weight);

        return result;
      }
    }
    const startDate = weightsDates[weightsDates.length - 1];
    let date = new Date();
    date.setDate(date.getDate() - 32);

    return date.toISOString();
  };

  return (
    <div>
      <Show when={!lostOrGained(props.weeks, props.weightsDates)}>
        Weigh yourself to see progress!
        </Show>;
    </div>
  );
};

export default WeightInTime;
