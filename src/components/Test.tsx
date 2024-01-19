import { type Component } from "solid-js";
import { trpc } from "../utils/trpcClient";

const Test: Component<{}> = (props) => {
  const test = trpc.greeting.useQuery();

  return <div>{test.data}</div>;
};

export default Test;
