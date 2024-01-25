import { type Component } from "solid-js";

const WeightIcon: Component<{}> = (props) => {
  return (
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-1 flex-col">
        <h1>Weight tracker</h1>
        <div>Lost last week</div>
        <div>Lost last month</div>
      </div>
      <div class="flex-1">Chart total</div>
    </div>
  );
};

export default WeightIcon;
