import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import Sample from "./Sample";

const Set = ({ set }) => (
  <View>
    <ScrollView>
      <View style={styles.container}>
        <Text>{set.title}</Text>
        <Text>{set.description}</Text>
        <FlatList
          data={getSampleList(set)}
          renderItem={list => <Sample set={set} sample={list.item} />}
        />
      </View>
    </ScrollView>
  </View>
);

function getSampleList(set) {
  return Object.keys(set.samples).map(name =>
    Object.assign({ key: name, name }, set.samples[name])
  );
}

export default Set;
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
