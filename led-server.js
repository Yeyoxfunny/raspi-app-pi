const SERVER_IP_ADDRESS = "http://raspiapp.herokuapp.com/";
const timeTool = require("./utilities/time-tool");
var myShutdown;
var isLedOn = false;

const socket = require("socket.io-client")(SERVER_IP_ADDRESS);

socket.on("connect", function() {
  console.log("Connected to " + SERVER_IP_ADDRESS);
});

const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  const led = new five.Led("P1-13");

  socket.on("toggleServer", function(data) {
    led.toggle();
    isLedOn = !isLedOn;
  });
  socket.on("shutdownServer", function(data) {
    var delay = isNaN(data.delay) ? 5000 : data.delay;
    delay = timeTool(delay, data.option);
    console.log(delay);
    myShutdown = setTimeout(function() {
      led.toggle();
      socket.emit("togglePi", { isOn: isLedOn, isPong: true });
    }, delay);
  });
  socket.on("cancelShutdownServer", function() {
    clearTimeout(myShutdown);
  });
});
