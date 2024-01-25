import { QueryClientProvider } from "@tanstack/solid-query";
import { type Component } from "solid-js";
import { queryClient, trpc } from "../utils/trpcClient";
import WeightIcon from "./WeightIcon";
import ExerciseIcon from "./ExerciseIcon";

const IndexSub: Component<{}> = (props) => {
  return (
    <div class="w-full min-h-screen flex-col flex justify-start items-center lg:justify-center">
      <div class="flex-col flex justify-center items-center">
        <WeightIcon />
        <ExerciseIcon />
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
