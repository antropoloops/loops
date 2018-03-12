import React from 'react';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';

import { WebBrowser, FileSystem, Audio, Asset } from 'expo';
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
	this.onPressLoad=this.onPressLoad.bind(this);
	//playing
	this.onPressPlay=this.onPressPlay.bind(this);
	this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);

    };

    toggleAudioPlayback() {
	try {
	this.setState({
	    isPlaying: !this.state.isPlaying,
	}, () => (this.state.isPlaying
		  ? this.soundObject.playAsync()
		  : this.soundObject.stopAsync()));
	} catch (e) {
	    this.setState({message: e});	    
	    console.log('ERROR playing Audio', e);
	}
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
	FileSystem.downloadAsync('https://antropoloops.github.io/audiosets/continentes/camino.wav',
				 FileSystem.documentDirectory + 'camino.wav')
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
    attachJson(data){
	console.log(data);
	this.setState({ json: JSON.parse(data)});

    }
    onPressLoad(){
	console.log("load music", this.state.audio);
	FileSystem.downloadAsync(
	    'https://raw.githubusercontent.com/antropoloops/app/master/public/continentes.audioset.json',
	    FileSystem.documentDirectory + 'continentes.audioset.json'
	)
	    .then(({ uri }) => {
	//		console.log('Finished json downloading to ', uri);
		FileSystem.readAsStringAsync(uri).then(this.attachJson);

		this.setState({ json_uri: uri, message: "downloaded json uri"+uri});
	    })
	    .catch(error => {
		console.error(error);
	    });

	try {
	    this.soundObject.loadAsync({uri: this.state.audio});
	    this.setState({message:this.state.audio+" loaded!"});
	} catch (e) {
	    this.setState({message:e});
	    console.log('ERROR Loading Audio', e);
	}
    }

    printSamples(p){
	var s="";
	for (var key in p) {
	    if (p.hasOwnProperty(key)) {
		s+= key+" ";
	    }
	}
	return s;

    }
    
    render() {
	return (<ScrollView >
		<View style={styles.container}>
		<Text> .... </Text>
		<Text> .... </Text>
		<Button onPress={this.onPressDownload} title="DOWNLOAD!" color="#841584" />
		<Button onPress={this.onPressLoad} title="LOAD!" color="#841584" />
		<Button onPress={this.onPressPlay} title="PLAY!" color="#841584" />
		<Text>JAU {this.state.message}</Text>
		<Text>JSON {this.state.json ?
			    this.printSamples(this.state.json.samples)
			    : "oh"} </Text>
		</View>

		
		</ScrollView>
		
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
