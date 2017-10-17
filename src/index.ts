import { Logger } from './Logger';
import { MidiGenerator, INote } from './MidiGenerator';

function init(){
  Logger.start();
  process.on('SIGINT', function () {
    MidiGenerator.flush();
    process.exit();
  });
}

function main() {
  const notes = [];
  setInterval(
    ()=>{
      const note: INote = {
        port: 0,
        channel: 0,
        pitch: 60,
        length: 50
      };
      note.pitch = Math.floor(Math.random() * 40 + 30);
      note.length = Math.floor(Math.random() * 3000 + 100);
      MidiGenerator.noteOut(note);
    }, 300
  );
}
init();
main();
