import * as midi from 'midi';
import { midiState } from './constants/MIDI';
import { Logger } from './Logger';
const midiOut = new midi.output();

export interface INote {
    port: number;
    channel: number;
    pitch: number;
    length: number;
}

export class MidiGenerator {
    static noteOut(note:INote){
        const { port, channel, pitch, length } = note;
        Logger.midiInfo(note, midiState.ON);
        midiOut.openPort(port);
        midiOut.sendMessage([144 + channel, pitch, 120]);
        midiOut.closePort(port);
		setTimeout(() => {
                Logger.midiInfo(note, midiState.OFF);
				midiOut.openPort(port);
				midiOut.sendMessage([128 + channel, pitch, 120]);
				midiOut.closePort(port);
		}, length);
    }
    static flush(){
        Logger.system("Flush all MIDI notes");
        const portCount = midiOut.getPortCount();
        for(let i = 0; i < portCount; i++){
            midiOut.openPort(i);
			for (let note = 0; note < 127 ; note++){
				midiOut.sendMessage([128+i, note, 120]);
			}
            midiOut.closePort(i);
        }

    }
}