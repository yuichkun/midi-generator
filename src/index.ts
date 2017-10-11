import { MidiGenerator, INote } from './MidiGenerator';

console.log("start app");
const note:INote = {
  port: 0,
  channel: 0,
  pitch: 60,
  length: 500  
};
MidiGenerator.noteOut(note);