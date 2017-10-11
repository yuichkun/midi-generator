var midi = require('midi');
var midiOut = new midi.output();

var midiGenerator = {
	noteOut : function(port,channel,pitch,dur){
		console.log("Port " + port + " Channel " + channel + ": note on " + pitch);
		midiOut.openPort(port);
		midiOut.sendMessage([144 + channel,pitch,120]);
		midiOut.closePort(port);
		setTimeout(function(){
				console.log("Port "+ port + " Channel " + channel + ": note off " + pitch);
				midiOut.openPort(port);
				midiOut.sendMessage([128 + channel,pitch,120]);
				midiOut.closePort(port);
		},dur);
	},
	flush : function(){
		console.log("Flush all MIDI notes");
		for(var i = 0; i < 16; i++){
			midiOut.openPort(0);
			for (var note = 0; note < 127 ; note++){
				midiOut.sendMessage([128+i,note,120]);
			}
			midiOut.closePort(0);
		}
	}
}
module.exports = midiGenerator;
