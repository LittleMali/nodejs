const net = require('net');
const client = new net.Socket();

const SRV_PORT = 12345;
//const SRV_IP = 'localhost';
const SRV_IP = '148.70.209.112';

const OPTION = {
    timeout: 500,
    encoding: 'utf8',
    tcpOption: {
        port: SRV_PORT,
        host: SRV_IP,
    },
    retriedTimes: 0,
    maxReTries: 100,
    retryInterval: 1000
};

client.setTimeout(OPTION.timeout);
client.setEncoding(OPTION.encoding);
client.on('data', data => {
    console.log('DATA: ' + data);
    // client.destroy();// close connect
});

client.on('end', () => {
    console.log('Client disnected');
});

client.on('close', () => {
    console.log('tcp connection closed');
    reConnect()
});

client.on('error', err => {
    // infoLogger.error(err);
});
client.on('timeout', () => {

});

function conncect() {
    client.connect(OPTION.tcpOption, () => {
        OPTION.retriedTimes = 0;
        console.log(`tcp conncet success!--->local:${client.localAddress}:${client.localPort}=>remote:${client.remoteAddress}:${client.remotePort}`);
        client.write('this is tcp client by Node.js');//服务器向客户端发送消息
    });

}
//Reconnect server
function reConnect() {
    if (OPTION.retriedTimes >= OPTION.maxReTries) {
        console.log('Max retries have been exceeded,I give up.');
    } else {
        OPTION.retriedTimes += 1;
        console.log(`connect:${OPTION.retriedTimes}`);
        setTimeout(conncect, OPTION.retryInterval);
    }
}

conncect();
