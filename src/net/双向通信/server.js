const net = require('net')
const netServer = net.createServer()
const clientList = []
netServer.listen(8000)
netServer.on('connection', socket => {
    console.log(socket)
    socket.write(JSON.stringify({
        type: 'connected',
        data: 'xx'
    }))
    clientList.push(socket)
    setInterval(() => {
        socket.write(JSON.stringify({
            type: 'interval',
            data: '>>>>>'
        }))
    }, 3000);
    socket.on('data', data => {
        console.log(data.toString())
    })
    socket.on('error', err => {
        console.log(err)
    })
})