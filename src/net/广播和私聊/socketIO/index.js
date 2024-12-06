const { Socket } = require("socket.io");

const socketList = {
    // 'userid':socket实例
}
function initIO(io) {
    io.on("connection", (socket) => {
        socket.once('establised', userId => {
            if (socketList[userId]) {
                socketList[userId].disconnect()
            }
            socketList[userId] = socket;
        })
        socket.on('disconnect', reason => {
            // 清除socket
            for (var userId in socketList) {
                if (socketList[userId] === socket) {
                    console.log('断开连接'+userId,reason)
                    delete socket[userId]
                    break;
                }
            }
        })
        socket.on('message', data => {
            const { userId, payload } = data||{};
            //群发
            for (var socketk in socketList) {
                console.log(socketk)
                if (socketk !== userId) {
                    socketList[socketk].emit('message',data)
                }
            }
        })
    });
}

module.exports = {
    initIO,
    socketList
}