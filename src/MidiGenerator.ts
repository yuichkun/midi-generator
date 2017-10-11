import * as midi from 'midi';
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
        console.log("Port " + port + " Channel " + channel + ": note on " + pitch);
        midiOut.openPort(port);
        midiOut.sendMessage([144 + channel, pitch, 120]);
        midiOut.closePort(port);
		setTimeout(() => {
				console.log("Port "+ port + " Channel " + channel + ": note off " + pitch);
				midiOut.openPort(port);
				midiOut.sendMessage([128 + channel, pitch, 120]);
				midiOut.closePort(port);
		}, length);
    }
    static flush(){
        console.log("Flush all MIDI notes");
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