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

const SetSampleList = ({ set }) => (
  <ScrollView>
    <View style={styles.container}>
      <Text>El set!</Text>
    </View>
  </ScrollView>
);

export default SetSampleList;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
