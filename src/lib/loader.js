import { FileSystem, Audio } from "expo";

export function loadSet(name) {
  const path = `audiosets/${name}.audioset.json`;

  const source = `https://antropoloops.github.io/${path}`;
  const uri = FileSystem.documentDirectory + name;

  // Download (if not present in the filesystem) and return the parsed contents
  return FileSystem.getInfoAsync(uri)
    .then(info => (info.exists ? info : FileSystem.downloadAsync(source, uri)))
    .then(result => FileSystem.readAsStringAsync(result.uri))
    .then(contents => JSON.parse(contents));
}

function makeDirectoryIfNotExists(dir) {
  return FileSystem.getInfoAsync(dir).then(
    info =>
      info.exists ? dir : FileSystem.makeDirectoryAsync(dir).then(() => dir)
  );
}

export function downloadSample(set, name) {
  const setName = set.name || set.title.toLowerCase();
  const dir = FileSystem.documentDirectory + setName;

  makeDirectoryIfNotExists(dir).then(result => console.log("Dir!!", result));

  const source = `https://antropoloops.github.io/audiosets/continentes/${name}.wav`;
  const dest = FileSystem.documentDirectory + name + ".wav";
  console.log("Loading", source, dest);
  return FileSystem.downloadAsync(source, dest).then(result => {
    return result.uri;
  });
}

export function loadAudio(set, name) {
  // if (soundsCache[name]) return Promise.resolve(soundsCache[name]);

  const sound = new Audio.Sound();
  return downloadSample(set, name)
    .then(uri => {
      return sound.loadAsync({ uri });
    })
    .then(() => {
      return sound;
    })
    .catch(err => console.log("download sample err", name, err));
}
