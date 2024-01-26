import { QueryClientProvider } from "@tanstack/solid-query";
import { For, type Component, Show } from "solid-js";
import { queryClient, trpc } from "../../utils/trpcClient";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../server/router";

type RouterOutput = inferRouterOutputs<AppRouter>;

type WeightsDates = RouterOutput["readWeights"];

const IndexSub: Component<{}> = (props) => {
  const weightsDates = trpc.readWeights.useQuery();

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
        <Show when={weightsDates.data}>
          {(data) => (
            <Show when={lostOrGained(1, data())} fallback="Weigh yourself to see progress!">
              
            </Show>
          )}
        </Show>
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
