var socket = require('socket.io-client')('http://192.168.0.2:3000');

socket.on('connect', function(){
    console.log('Hello friend');
});


var Cylon = require('cylon');
var timeTool = require('./utilities/time-tool');
var myShutdown;

Cylon.robot({
	connections: { raspi: { adaptor: 'raspi'} },
	devices: {
        led: { driver: 'led', pin: 3 }
    },
    work: function (my) {
        socket.on('toggleServer',function(data){
            my.led.toggle();
        });
        socket.on('shutdownServer',function(data){
            var delay = isNaN(data.delay)?5000:data.delay;
            delay = timeTool(delay, data.option);
            console.log(delay);
            myShutdown = setTimeout(function(){
                my.led.toggle();
                socket.emit('togglePi',{isOn: my.led.isOn(), isPong: true});
            }, delay);
        });
        socket.on('cancelShutdownServer',function(){
            clearTimeout(myShutdown);
        });
    }
}).start();
