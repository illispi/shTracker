import { type Component } from "solid-js";
import { trpc } from "../utils/trpcClient";

const ExerciseIcon: Component<{}> = (props) => {
  const test = trpc.greeting.useQuery(undefined);

  return (
    <div>
      <div>Exercise icon</div>
      <div>{test.data}</div>
    </div>
  );
};

export default ExerciseIcon;
