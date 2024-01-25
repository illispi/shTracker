import { type Component } from "solid-js";

const WeightIcon: Component<{}> = (props) => {
  return (
    <div>
      <div>
        <h1>Weight tracker</h1>
        <div>Lost last week</div>
        <div>Lost last month</div>
      </div>
      <div>Chart total</div>
    </div>
  );
};

export default WeightIcon;
