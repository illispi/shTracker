import { type Component } from "solid-js";
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
    const startDate = weightsDates[weightsDates.length - 1];
    let date = new Date();
    date.setDate(date.getDate() - 32);

    return date.toISOString();
  };

  return <h2>{lostOrGained(props.weeks, props.weightsDates)}</h2>;
};

export default WeightInTime;
