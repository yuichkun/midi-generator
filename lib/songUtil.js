var fs = require('fs');
var scales = JSON.parse(fs.readFileSync('./node_modules/midiGenerator/lib/scales.json', 'utf8'));
class Pitch {

  static getScale(scaleName){
    return scales[scaleName];
  }

  static transpose(scale, transp){
    var _scale = [];
  	scale.forEach(function(note){
  		_scale.push(note + transp);
  	});
    return _scale;
  }

  static constrain(pitch, low, high){
    while(pitch > high){
      pitch -= 12;
    }
    while(pitch < low){
      pitch += 12;
    }
    return pitch;
  }

  static normalize(row){
    var ret = {};
    ret.offset = 0 - row[0];
    ret.row = [];
    for(var i = 0; i < row.length; i++){
      ret.row[i] = row[i] + ret.offset;
    }
    console.log("ret");
    console.log(ret);
    return ret;
  }
}


class Motif {

  static drone(scoreInfo, instData, args){
    var len = scoreInfo.unitLen * 2;
    var root = 36 + scoreInfo.scale.transp;
    var fifth = root + 7;
    var motif = {
      timing : [0,0],
      dur : [len,len],
      pitch : [root, fifth]
    }
    return motif;
  }

  static drumPat(scoreInfo, instData, args){
    const kick = 36;
    const snare = 38;
    const hihat = 44;

    var density = 16;
    var timing = [];
    var dur = [];
    var pitch = [];

    for(var i = 0, unit = scoreInfo.unitLen / density; i < density; i++){
      //hihat
      timing.push(i * unit);
      dur.push(unit * 0.9);
      pitch.push(hihat);

      //snare
      if(i % 4 == 2){
        if(Math.random() > 0.5){
          timing.push(i * unit);
          dur.push(unit * 0.9);
          pitch.push(snare);
        }
      }
      if(i % 4 == 0){
        if(Math.random() > 0.5){
          timing.push(i * unit);
          dur.push(unit * 0.9);
          pitch.push(kick);
        }
      }
    }

    var motif ={
      timing : timing,
      dur : dur,
      pitch: pitch
    };

    return motif;
  }

  static chords(scoreInfo, instData, args){
    var scale = scoreInfo.scale.row;
    var low = instData.register.low;
    var high = instData.register.high;
    var chordNum = args.chordNum || 3;
    var density = args.density || 4;
    var timing = [];
    var dur = [];
    var pitch = [];

    for(var i = 0, unit = scoreInfo.unitLen / density; i < density; i++){
      for(var j = 0; j < chordNum; j++){
        timing.push(i * unit);
        dur.push(unit * 0.9);
        var octave = 12 * (Math.floor(Math.random() * 10) - 5);
        var offset = 60 + octave;
        var _pitch = scale[Math.floor(Math.random() * scale.length)] + offset;
        _pitch = Pitch.constrain(_pitch, low, high);
        pitch.push(_pitch);
      }
    }


    var motif = {
      timing : timing,
      dur : dur,
      pitch : pitch
    };
    return motif;
  }

  static particle(scoreInfo, instData, args){
    var scale = scoreInfo.scale.row;
    var low = instData.register.low;
    var high = instData.register.high;
    var density = args.density || 16;
    var timing = [];
    var dur = [];
    var pitch = [];
    for(var i = 0, unit = scoreInfo.unitLen / density; i < density; i++){
      timing.push(i * unit);
      dur.push(unit * 0.9);
      var octave = 12 * (Math.floor(Math.random() * 10) - 5);
      var offset = 60 + octave;
      var _pitch = scale[Math.floor(Math.random() * scale.length)] + offset;
      _pitch = Pitch.constrain(_pitch, low, high);
      pitch.push(_pitch);
    }
    var motif = {
      timing : timing,
      dur : dur,
      pitch : pitch
    }
    return motif;
  }
}

module.exports = {
  Pitch: Pitch,
  Motif : Motif
}
