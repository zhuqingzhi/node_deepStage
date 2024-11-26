const net = require('net')
const socket = net.createConnection(8000)
const repl = require('repl')
var replServer;
var globalCallback;
var nickName;
function wrapData(data) {
    let res = {
        nickName,
        data,
        date:Date.now()
    }
    return JSON.stringify(res)
}
socket.on('connect', () => {
    console.log('成功连接')
    console.log('请输入Nickname')
    // 提示信息
    replServer = repl.start({
        eval: (cmd, context, filename, callback) => {
            cmd=cmd.replace('\n','')
            if (!globalCallback) {
                // 输入昵称
                nickName = cmd;
                globalCallback=callback
                globalCallback(null)
                // 发送信息
                socket.write(wrapData(nickName))
                return;
            }
            if (cmd === 'exit') {
                socket.end()
                globalCallback(null)
                return;
            }
            socket.write(wrapData(cmd))
            globalCallback(null)
        }
    })
})
socket.on('close', hadError => {
    console.log('连接已关闭:', hadError)
    process.exit()
})
socket.on('error', err => {
    console.log(err)
})
socket.on('data', buffer => {
    globalCallback&&globalCallback(null,buffer.toString())
})