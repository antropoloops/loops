import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList
} from "react-native";
import PlayButton from "./PlayButton";
import { loadSet } from "./lib/loader";

export default class SelectSet extends React.Component {
  constructor(props) {
    super(props);
  }

  loadSet(name) {
    console.log("loading set", name);
    loadSet(name).then(set => {
      console.log("Set loaded!", set);
      this.props.onSetLoaded(set);
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Antropoloops Player</Text>
          <Text>Selecciona un set:</Text>
          <Button
            onPress={() => this.loadSet("continentes")}
            title="Continentes"
            color="#841584"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
