const net = require('net')
const netServer = net.createServer()

netServer.listen(8000, () => {
    console.log('服务启动...')
})
const socketList=new Set()
netServer.on('connection', socket => {
    console.log('新连接，当前连接数:',socketList.size)
    socketList.add(socket)
    socket.on('error', err => {
        console.log(err)
    })
    socket.on('close', hadError => {
        console.log('socket关闭,had error:', hadError)
        socketList.delete(socket)
    })
    socket.on('data', buffer => {
        // 广播给其他连接
        socketList.forEach(socketItem => {
            if (socketItem !== socket) {
                socketItem.write(buffer)
            }
        })
    })
})
netServer.on('error', err => {
    console.log(err)
})