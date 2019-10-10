var timeTool = require('./utilities/time-tool');
var myShutdown;


const socket = require('socket.io-client')('http://192.168.0.2:3000');

const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new five.Board({
  io: new Raspi()
});

socket.on('connect', function() {
    console.log('Hello friend');
});

board.on("ready", function() {
    const led = new five.Led("P1-13");
    led.blink();
  });
