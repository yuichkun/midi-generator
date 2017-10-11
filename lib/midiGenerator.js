"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var midi = require("midi");
var midiOut = new midi.output();
var MidiGenerator = /** @class */ (function () {
    function MidiGenerator() {
    }
    MidiGenerator.noteOut = function (note) {
        var port = note.port, channel = note.channel, pitch = note.pitch, length = note.length;
        console.log("Port " + port + " Channel " + channel + ": note on " + pitch);
        midiOut.openPort(port);
        midiOut.sendMessage([144 + channel, pitch, 120]);
        midiOut.closePort(port);
        setTimeout(function () {
            console.log("Port " + port + " Channel " + channel + ": note off " + pitch);
            midiOut.openPort(port);
            midiOut.sendMessage([128 + channel, pitch, 120]);
            midiOut.closePort(port);
        }, length);
    };
    MidiGenerator.flush = function () {
        console.log("Flush all MIDI notes");
        var portCount = midiOut.getPortCount();
        for (var i = 0; i < portCount; i++) {
            midiOut.openPort(i);
            for (var note = 0; note < 127; note++) {
                midiOut.sendMessage([128 + i, note, 120]);
            }
            midiOut.closePort(i);
        }
    };
    return MidiGenerator;
}());
exports.MidiGenerator = MidiGenerator;
