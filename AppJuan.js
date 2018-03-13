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
import { WebBrowser, FileSystem, Audio, Asset } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Audio.setIsEnabledAsync(true);
    this.state = { isPlaying: false, message: "welcome" };
    this.soundObject = new Audio.Sound();
    // downloading
    this.downloadAudio = this.downloadAudio.bind(this);
    this.attachJson = this.attachJson.bind(this);
    this.onPressDownload = this.onPressDownload.bind(this);
    // loading
    this.onPressLoad = this.onPressLoad.bind(this);
    //playing
    this.onPressPlay = this.onPressPlay.bind(this);
    this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);
  }
  toggleAudioPlayback() {
    try {
      this.setState(
        {
          isPlaying: !this.state.isPlaying
        },
        () =>
          this.state.isPlaying
            ? this.soundObject.playAsync()
            : this.soundObject.stopAsync()
      );
    } catch (e) {
      this.setState({ message: e });
      console.log("ERROR playing Audio", e);
    }
  }

  onPressPlay() {
    console.log("play music");
    this.setState({ message: "toggling music" });

    try {
      this.toggleAudioPlayback();
    } catch (e) {
      this.setState({ message: e });

      console.log("ERROR playing Audio", e);
    }
  }

  downloadAudio() {
    FileSystem.downloadAsync(
      "https://antropoloops.github.io/audiosets/continentes/camino.wav",
      FileSystem.documentDirectory + "camino.wav"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);

        this.setState({ audio: uri, message: "downloaded uri" + uri });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPressDownload() {
    console.log("downloading audio");
    this.downloadAudio();
  }

  attachJson(data) {
    this.setState({ json: JSON.parse(data) });
  }

  onPressLoad() {
    console.log("load music", this.state.audio);
    FileSystem.downloadAsync(
      "https://raw.githubusercontent.com/antropoloops/app/master/public/continentes.audioset.json",
      FileSystem.documentDirectory + "continentes.audioset.json"
    )
      .then(({ uri }) => {
        FileSystem.readAsStringAsync(uri).then(this.attachJson);

        this.setState({ json_uri: uri, message: "downloaded json uri" + uri });
      })
      .catch(error => {
        console.error(error);
      });

    try {
      this.soundObject.loadAsync({ uri: this.state.audio });
      this.setState({ message: this.state.audio + " loaded!" });
    } catch (e) {
      this.setState({ message: e });
      console.log("ERROR Loading Audio", e);
    }
  }

  printSamples(samples) {
    const sampleList = Object.keys(samples).map(name =>
      Object.assign({ key: name }, samples[name])
    );
    return (
      <FlatList
        data={sampleList}
        renderItem={item => {
          return item.item.key ? (
            <PlayButton sample={item.item} />
          ) : (
            <Text>Algo pasa aqui</Text>
          );
        }}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text> .... </Text>
          <Text> .l.l.l. </Text>
          <Button
            onPress={this.onPressDownload}
            title="DOWNLOAD!"
            color="#841584"
          />
          <Button onPress={this.onPressLoad} title="LOAD!" color="#841584" />
          <Text>JAU {this.state.message}</Text>

          {this.state.json ? (
            this.printSamples(this.state.json.samples)
          ) : (
            <Text>NOTHING</Text>
          )}
          <Text>Timestamp: {this.props.time}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
