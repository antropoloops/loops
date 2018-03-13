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
      <Text>{set.title}</Text>
      <Text>{set.description}</Text>
      <FlatList
        data={getSampleList(set)}
        renderItem={list => {
          return list.item.key ? (
            <PlayButton sample={list.item} />
          ) : (
            <Text>Algo pasa aqui</Text>
          );
        }}
      />
    </View>
  </ScrollView>
);

function getSampleList(set) {
  return Object.keys(set.samples).map(name =>
    Object.assign({ key: name, name }, set.samples[name])
  );
}

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
