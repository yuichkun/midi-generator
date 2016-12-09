var midiGen = require('./midiGenerator.js');
var util = require('./songUtil.js');
var Pitch = util.Pitch;
var Song = require('./song.js');
var createOSCServer = require('./oscServer.js');

class SongGenerator{
	constructor(){
		console.log("START : SongGenerator");
		createOSCServer(this);
	}

	init(songData, styles){
		this.songData = songData;
		this.styles = styles;
	}

	start(){
		midiGen.flush();
		var data = this.songData;
		this.counter = 0;
		this.style = "neutral";
		this.scoreInfo = {};
		this.scoreInfo.offset = 0;
		this.setBPM(data.scoreInfo.bpm);
		this.setInsts(data.insts);
		this.setScale(data.scoreInfo.scaleName, data.scoreInfo.transp);
		this.song = new Song();
		this.playSong();
	}

	setInsts(insts){
		this.insts = insts;
	}

	playSong(){
		var song = this.song;
		var scoreInfo = this.scoreInfo;
		var insts = this.insts;
		var interval = this.scoreInfo.unitLen;
		var _this = this;
		this.play = setTimeout(function(){
			_this.styleCheck();
			var score = song.genScore(scoreInfo, insts);
			song.playScore(score);
			//recursive function
			_this.playSong(song);
		}, interval);
	}

	changeBPM(string){
		var variant;
		if(string === "faster"){
			variant = 40;
		}
		if(string === "slower"){
			variant = -40;
		}
		this.scoreInfo.bpm += variant;
		this.scoreInfo.unitLen = bpmToSec(this.scoreInfo.bpm);
	}

	changeStyle(string){
		this.style = string;
	}

	styleCheck(){
		console.log("Counter " + this.counter);
		var style = this.styles[this.style];
		var order = style.order;

		var muted = [];
		var unmuted = [];

		for(var i = 0; i < this.counter; i++){
			for(var chan = 0; chan < 16; chan++){
				if(order[i]-1 == chan){
					unmuted.push(chan);
				} else {
					muted.push(chan);
				}
			}
		}
		var _this = this;
		muted.forEach(function(item){
			_this.mute(item, true);
		});
		unmuted.forEach(function(item){
			_this.mute(item, false);
		});
		this.setScale(style.scale.name, style.scale.transp);
	}

	stop(){
		clearTimeout(this.play);
		midiGen.flush();
	}

	mute(channel, muteState){
		if(channel < this.insts.length){
			this.insts[channel].muted = muteState;
		}
	}

	setScale(scaleName, _transp){
		var transp =_transp + this.scoreInfo.offset;
		this.scoreInfo.scale = {
			name : scaleName,
			transp : transp,
			row: getScaleRow(scaleName, transp)
		};
	}

	setBPM(bpm){
		this.scoreInfo.bpm = bpm;
		this.scoreInfo.unitLen = bpmToSec(bpm);
	}
}

function bpmToSec(bpm){
	return (60 / bpm) * 1000 * 4;
};

function 	getScaleRow(scaleName, transp){
	var scale = Pitch.getScale(scaleName);
	var transpScale = Pitch.transpose(scale, transp);
	return transpScale;
};

module.exports = SongGenerator;
