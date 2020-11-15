
/*创建简单的UDP客户端*/
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

const SRV_PORT = 12345;
//const SRV_IP = 'localhost';
const SRV_IP = '148.70.209.112';

for (var i = 0; i < 10; ++i) {
    var msg = 'udp client, send data, i=' + i;
    client.send(msg, 0, msg.length, SRV_PORT, SRV_IP, function (err, bytes) {
        if (err)
            console.log('发送数据失败');
        else {
            console.log('已发送%d字节数据', bytes);
        }
    });
}

client.on('message', function (msg, rinfo) {
    console.log('已接收服务器发送的数据：%s', msg);
    console.log('服务器的地址为%s', rinfo.address);
    console.log('服务器所用端口为%s', rinfo.port);
    client.close();
});
client.on('close', function () {
    console.log('socket端口被关闭');
});
