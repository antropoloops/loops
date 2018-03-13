import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import { loadSet } from "../lib/loader";

export default class SelectSet extends React.Component {
  constructor(props) {
    super(props);
  }

  loadSet(name) {
    loadSet(name).then(set => {
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
