import { type Component } from "solid-js";
import { queryClient, trpc } from "../utils/trpcClient";
import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";

const TestSub: Component<{}> = (props) => {
  const test = trpc.greeting.useQuery(undefined, () => ({
    initialData: () => props.data.result.data,
  }));

  //   const query = createQuery(
  //     () => ({
  //       queryKey: ["test"],
  //       queryFn: async () => {
  //         await new Promise((r) => setTimeout(r, 1000));
  //         return "Success";
  //       },
  //     }),
  //     () => queryClient
  //   );

  return <div>{test.data}</div>;
};

const Test = (props) => (
  <QueryClientProvider client={queryClient}>
    <trpc.Provider queryClient={queryClient}>
      <TestSub data={props.data} />
    </trpc.Provider>
  </QueryClientProvider>
);

export default Test;
