var osc = require('node-osc');
var oscServer = new osc.Server(1192);


module.exports = function(that){
  console.log("LAUNCHED : OSC Server");
  oscServer.on("message", function(msg,rinfo){
    switch(msg[0]){
      case '/bpm':
        console.log("–––––––––Change BPM To " + msg[1] + "–––––––––––");
        that.setBPM(msg[1]);
        break;
      case '/faster':
        console.log("–––––––––BPM faster–––––––––––");
        that.changeBPM("faster");
        break;
      case '/slower':
        console.log("–––––––––BPM slower–––––––––––");
        that.changeBPM("slower");
        break;
      case '/scale':
        console.log("–––––––––Change scale To " + msg[1] + "–––––––––––");
        that.setScale(msg[1], that.scoreInfo.scale.transp);
        break;
      case '/transp':
        console.log("–––––––––Transposition Change To " + msg[1] + "–––––––––––");
        that.scoreInfo.offset = msg[1];
        break;
      case '/mute':
        if(msg[1] >= 0 && msg[1] < that.insts.length){
          if(msg[2] == 0 || msg[2] == 1){
            console.log("–––––––––Mute Change To " + msg + "–––––––––––");
            that.mute(msg[1], msg[2]);
          }
        }
        break;1
      case '/init':
        console.log("–––––––––start–––––––––––");
        that.stop();
        that.start();
        break;
      case '/counter':
        console.log("–––––––––Counter inc–––––––––––");
        that.counter++;
        break;
      case '/style':
        console.log("–––––––––Style Change–––––––––––");
        that.changeStyle(msg[1]);
        break;
      default:
        console.log("Invalid OSC address");
        console.log(msg);
    }
  });
};
