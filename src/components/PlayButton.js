import React from "react";
import { Button } from "react-native";
import { loadSample } from "../lib/loader";

class PlayButton extends Button {
  constructor(props) {
    super(props);
    this.state = { sound: null, isPlaying: false };
  }
  componentWillMount() {
    loadSample(this.props.sample.filename).then(sound => {
      this.setState({ sound });
    });
  }

  togglePlay() {
    const { sound, isPlaying } = this.state;
    if (!sound) return;

    if (isPlaying) {
      sound.stopAsync();
    } else {
      sound.playAsync();
    }
    this.setState({ isPlaying: !isPlaying });
  }

  render() {
    const { sample } = this.props;
    const { sound, isPlaying } = this.state;

    const title = sample.key;
    const color = sound ? (isPlaying ? "green" : "#ff00ff") : "gray";
    return (
      <Button
        title={title}
        disabled={sound === null}
        color={color}
        onPress={() => this.togglePlay()}
      />
    );
  }
}

export default PlayButton;
