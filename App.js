import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebBrowser, FileSystem, Audio } from 'expo';
export default class App extends React.Component {
    constructor(props) {
	super(props);
	// Audio.setIsEnabledAsync(true);
	this.state = { isPlaying: false, message: "welcome" };
	this.soundObject = new Audio.Sound();
	// downloading
	this.downloadAudio = this.downloadAudio.bind(this);
	this.onPressDownload = this.onPressDownload.bind(this);
	// loading
	this.onPressLoad=this.onPressLoad.bind(this);
	//playing
	this.onPressPlay=this.onPressPlay.bind(this);
	this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);

    };

    toggleAudioPlayback() {
	this.setState({
	    isPlaying: !this.state.isPlaying,
	}, () => (this.state.isPlaying
		  ? this.soundObject.playAsync()
		  : this.soundObject.stopAsync()));
    }

    onPressPlay(){
	console.log("play music");
	this.setState({message: "toggling music"});
	try {
	    this.toggleAudioPlayback();
	} catch (e) {
	    this.setState({message: e});
	    
	    console.log('ERROR playing Audio', e);
	}
    }

    
    downloadAudio() {
	FileSystem.downloadAsync('http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
				 FileSystem.documentDirectory + 'crowd-cheering.mp3')
	    .then(({ uri }) => {
		console.log('Finished downloading to ', uri);
		
		this.setState({ audio: uri, message: "downloaded uri"+uri});
	    })
	    .catch(error => {
		console.error(error);
	    });}

    onPressDownload(){
	console.log("downloading audio");
	this.downloadAudio();
    }

    onPressLoad(){
	console.log("load music", this.state.audio);
	try {
	    this.soundObject.loadAsync({ uri: this.state.audio});
	    this.setState({message:this.state.audio+" loaded!"});
	} catch (e) {
	    console.log('ERROR Loading Audio', e);
	}
    }

    
    render() {
	return (<View style={styles.container}>
		<Button onPress={this.onPressDownload} title="DOWNLOAD!" color="#841584" />
		<Button onPress={this.onPressLoad} title="LOAD!" color="#841584" />
		<Button onPress={this.onPressPlay} title="PLAY!" color="#841584" />
		<Text>{this.state.message}</Text>
		</View>
	       );
    }
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
    },
});
