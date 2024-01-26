import { QueryClientProvider } from "@tanstack/solid-query";
import { For, type Component } from "solid-js";
import { queryClient, trpc } from "../../utils/trpcClient";
import WeightInTime from "../WeightInTime";

const IndexSub: Component<{}> = (props) => {
  const weightsDates = trpc.readWeights.useQuery();
  return (
    <div class="flex min-h-screen w-full flex-col items-center justify-start lg:justify-center">
      <div class="flex w-full flex-col items-center justify-center">
        {/* Weight banner */}
        <div class="flex w-full max-w-screen-lg flex-col lg:flex-row">
          <div class="flex flex-1 flex-col items-center justify-center">
            <h1>Weight tracker</h1>
            <div>Lost last week</div>
            <div>Lost last month</div>
          </div>
          <div class="flex-1">Chart total</div>
        </div>
        {/* Exercise banner */}
        <div>
          <div>Exercise icon</div>
        </div>
        <WeightInTime text="last week" weeks={1} weightsDates={weightsDates.data} />
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
