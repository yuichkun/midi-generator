import { INote } from './MidiGenerator';
import { midiState } from './constants/MIDI';

enum COLORS {
    BLACK   = '\u001b[30m',
    RED     = '\u001b[31m',
    GREEN   = '\u001b[32m',
    YELLOW  = '\u001b[33m',
    BLUE    = '\u001b[34m',
    MAGENTA = '\u001b[35m',
    CYAN    = '\u001b[36m',
    WHITE   = '\u001b[37m',
    RESET   = '\u001b[0m'
}

export class Logger{
    static warn(text:any){
        log(COLORS.RED, text);
    }
    static system(text:any){
        bar();
        log(COLORS.CYAN, text);
        bar();
    }
    static midiInfo(note:INote, state:midiState){
        const { port, channel, pitch } = note;
        const stateMSG = state === midiState.ON ? "on" : "off";
        log(COLORS.MAGENTA, `Port ${port} Channel ${channel} note ${stateMSG} ${pitch}`);
    }
}
function log(color:COLORS, text:any){
    console.log(color + text + COLORS.RESET);
}
function bar(){
    console.log(COLORS.YELLOW + '–––––––––––––––––––––––––––––––––' + COLORS.RESET);
}