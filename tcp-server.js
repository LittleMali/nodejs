const net = require('net');
const server = net.createServer();

const SRV_PORT = 22345;

const OPTION = {
    port: SRV_PORT,
    //host: 'localhost',
    timeout: 60000,
    keepAliveTime: 10000
}
let socketArr = [];
server.on('connection', (socket) => {
    console.log(`socketConnect:${socket.remoteAddress}:${socket.remotePort}`);
    socketArr.push(socket);
    // socket.setEncoding('utf8');
    socket.setTimeout(OPTION.timeout);
    socket.setKeepAlive(true, OPTION.keepAliveTime);//keep net alive
    socket.on('data', function (data) {
        console.log(`DATA ${socket.remoteAddress}`);
        // JSON.stringify(myObj);
    });
    socket.on('timeout', () => {
        // sock.write('connect timeout,disconnecting,bye!');
        // socket.end();
    });

    socket.on('close', function () {
        let index = socketArr.indexOf(socket);
        socketArr.splice(index, 1);
        console.log(`socketClose:${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('end', () => {
        console.log('client disconnected');
    });
    socket.on('error', (err) => {
        console.log(err);
    });
});
server.on('error', (err) => {
    console.log(err);
});
server.on('close', () => {
    console.log('server closed!');
});
server.listen(OPTION.port, () => {
    console.log(`socke server start! listen port ${OPTION.port}`);
});
