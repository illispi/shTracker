import { QueryClientProvider } from "@tanstack/solid-query";
import { For, type Component } from "solid-js";
import { queryClient, trpc } from "../utils/trpcClient";
import WeightIcon from "./WeightIcon";
import ExerciseIcon from "./ExerciseIcon";

const IndexSub: Component<{}> = (props) => {
  const weightsDates = trpc.readWeights.useQuery();
  return (
    <div class="flex min-h-screen w-full flex-col items-center justify-start lg:justify-center">
      <div class="flex w-full flex-col items-center justify-center">
        <WeightIcon />
        <ExerciseIcon />
        <For each={weightsDates.data}>
          {(item) => (
            <div>
              <p>{item.weight}</p>
              <p>{item.date.toString()}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

const IndexPage: Component<{}> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider queryClient={queryClient}>
        <IndexSub data={props.data} />
      </trpc.Provider>
    </QueryClientProvider>
  );
};

export default IndexPage;
