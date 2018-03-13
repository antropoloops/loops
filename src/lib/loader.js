const soundsCache = {};
const uriCache = {};

import { FileSystem, Audio } from "expo";

export function loadSet(name) {
  const path = `audiosets/${name}.audioset.json`;

  const source = `https://antropoloops.github.io/${path}`;
  const dest = FileSystem.documentDirectory + name;

  console.log("loadSet", source, dest);

  return FileSystem.downloadAsync(source, dest)
    .then(result => {
      console.log("load set result", result);
      return FileSystem.readAsStringAsync(result.uri);
    })
    .then(content => JSON.parse(content));
}

export function downloadSample(name) {
  if (uriCache[name]) return Promise.resolve(uriCache[name]);

  const source = `https://antropoloops.github.io/audiosets/continentes/${name}.wav`;
  const dest = FileSystem.documentDirectory + name + ".wav";
  console.log("Loading", source, dest);
  return FileSystem.downloadAsync(source, dest).then(result => {
    const { uri } = result;
    uriCache[name] = uri;
    return uri;
  });
}

export function loadSample(name) {
  // if (soundsCache[name]) return Promise.resolve(soundsCache[name]);

  const sound = new Audio.Sound();
  return downloadSample(name)
    .then(uri => {
      return sound.loadAsync({ uri });
    })
    .then(() => {
      soundsCache[name] = sound;
      return sound;
    })
    .catch(err => console.log("download sample err", name, err));
}
