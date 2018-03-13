import React from "react";
import SetSampleList from "./SetSampleList";
import SelectSet from "./SelectSet";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { set: null };
  }

  render() {
    return this.state.set === null ? (
      <SelectSet onSetLoaded={set => this.setState({ set })} />
    ) : (
      <SetSampleList set={this.state.set} />
    );
  }
}
