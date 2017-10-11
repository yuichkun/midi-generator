import { Logger } from './Logger';
import { MidiGenerator, INote } from './MidiGenerator';

process.on('SIGINT', function(){
  Logger.system("EXIT: SongGenerator");
  MidiGenerator.flush();
  process.exit();
});

Logger.system("App started");
const note:INote = {
  port: 0,
  channel: 0,
  pitch: 60,
  length: 50  
};

setInterval(()=>{
MidiGenerator.noteOut(note);
}, 100);