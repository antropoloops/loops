import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { loadAudio } from "../lib/loader";

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = { sound: null, isPlaying: false };
  }
  componentWillMount() {
    const { set, sample } = this.props;
    loadAudio(set, sample.filename).then(sound => {
      this.setState({ sound });
    });
  }

  togglePlay() {
    const { sound, isPlaying } = this.state;
    if (!sound) return;

    const promise = isPlaying ? sound.stopAsync() : sound.playAsync();
    promise
      .then(() => {
        this.setState({ isPlaying: !isPlaying });
      })
      .catch(err => console.log("togglePlay error", err));
  }

  render() {
    const { sample } = this.props;
    const { sound, isPlaying } = this.state;

    const title = sample.key;
    const color = sound ? (isPlaying ? "green" : "#ff00ff") : "gray";
    return (
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Button
          title={isPlaying ? "Stop" : "Play"}
          disabled={sound === null}
          color={color}
          onPress={() => this.togglePlay()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Sample;
