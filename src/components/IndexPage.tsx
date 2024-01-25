import { QueryClientProvider } from "@tanstack/solid-query";
import { type Component } from "solid-js";
import { queryClient, trpc } from "../utils/trpcClient";
import WeightIcon from "./WeightIcon";

const IndexSub: Component<{}> = (props) => {
  return (
    <div class="w-full min-h-screen">
      <div class="flex-col flex">
        <WeightIcon />
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
