var dgram = require('dgram');

const SRV_PORT = 12345;

var server = dgram.createSocket('udp4').bind(SRV_PORT);
server.on('listening', function() {
    var address = server.address();
    console.log(`server listening on: ${address.address}, port: ${address.port}`);
})

server.on('message', function(msg, client) {
    console.log(`client is ${client.address}:${client.port}, msg: ${msg}`);
    server.send(msg, 0, msg.length, client.port, client.address);
})
