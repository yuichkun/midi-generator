"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const midi = require("midi");
const MIDI_1 = require("./constants/MIDI");
const Logger_1 = require("./Logger");
const midiOut = new midi.output();
class MidiGenerator {
    static noteOut(note) {
        const { port, channel, pitch, length } = note;
        const displayNote = MidiGenerator.extractNote(note);
        Logger_1.Logger.midiInfo(displayNote, MIDI_1.midiState.ON);
        midiOut.openPort(port);
        midiOut.sendMessage([144 + channel, pitch, 120]);
        midiOut.closePort(port);
        setTimeout(() => {
            Logger_1.Logger.midiInfo(displayNote, MIDI_1.midiState.OFF);
            midiOut.openPort(port);
            midiOut.sendMessage([128 + channel, pitch, 120]);
            midiOut.closePort(port);
        }, length);
    }
    static flush() {
        Logger_1.Logger.end();
        const portCount = midiOut.getPortCount();
        for (let i = 0; i < portCount; i++) {
            midiOut.openPort(i);
            for (let note = 0; note < 127; note++) {
                midiOut.sendMessage([128 + i, note, 120]);
            }
            midiOut.closePort(i);
        }
    }
    static extractNote(note) {
        const { port, channel, pitch } = note;
        const portName = midiOut.getPortName(port);
        return {
            port: portName,
            channel,
            pitch
        };
    }
}
exports.MidiGenerator = MidiGenerator;
