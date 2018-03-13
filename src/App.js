import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList
} from "react-native";

import SetSampleList from "./SetSampleList";
import SelectSet from "./SelectSet";
import PlayButton from "./PlayButton";
import { loadSet } from "./lib/loader";

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
