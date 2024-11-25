const net = require('net')
const socket = net.createConnection(8000)
socket.on('data', data => {
    console.log('client1 received:', data.toJSON())
    const dataObj = JSON.parse(data)
    if (dataObj.type === 'connected') {
        console.log('连接成功')
    } else {
        console.log('接收到data:', dataObj.data)
        socket.write('给server from client1')
    }
})
socket.on('error', err => {
    console.log(err)
})