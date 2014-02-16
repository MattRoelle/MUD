var net = require('net'),
    sys = require('sys');

var stdin  = process.openStdin(),
    buffer = '';

var socket = new net.Socket(9123, 'localhost');

socket.on('data', function(data) {
  console.log(data);
});

stdin.on('data', function(data) {
  socket.write(data.toString());
});
