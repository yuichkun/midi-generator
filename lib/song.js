var midiGen = require('./midiGenerator.js');
var songUtil = require('./songUtil.js');
var Tone = songUtil.Tone;
var Motif = songUtil.Motif;

class Song{
  constructor(){
  }
  genScore(scoreInfo, insts){
    var score = [];
    for(var i = 0; i < insts.length; i++){
      var inst = insts[i];
      if(!inst.muted){
        score.push(createInstrument(scoreInfo, inst));
      }
    }
    console.log("score");
    console.log(score);
    return	score;
  }
  playScore(score){
    var port = 0;
    for(var i = 0; i < score.length; i++){
      var midiChan = score[i].channel - 1;
      var inst = score[i];
      var noteCount = inst.pitch.length;
      for(var j = 0; j < noteCount; j++){
        var pitch = inst.pitch[j];
        var dur = inst.dur[j];
        var timing = inst.timing[j]
        playNote(port, midiChan, pitch, dur, timing);
      }
    }
  }
}

function createInstrument(scoreInfo, instData){
  var generator = eval("Motif." + instData.type.function);
  var args = instData.type.arguments;
  var motif = generator(scoreInfo, instData, args);
  motif.channel = instData.channel;
  return motif;
}

function playNote(port, midiChan, pitch, dur, timing){
  setTimeout(function(){
    midiGen.noteOut(port, midiChan, pitch, dur);
  }, timing);
}

module.exports = Song;
