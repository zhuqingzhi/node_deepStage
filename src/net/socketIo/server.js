const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer((req, res) => {
    // 设置 CORS 头部
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // 允许的HTTP方法
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // 允许的请求头
    res.setHeader('Access-Control-Allow-Credentials', true); // 是否允许发送Cookie

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 你的业务逻辑...
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});
const io = new Server(server)
io.on('connection', socket => {
    console.log('connection')
    const timer=setInterval(() => {
        socket.emit('data', {
            eventName: 'data',
            data: {
                name: 1,
                age:11
            }
        })
    }, 1000);
    socket.on('getUserInfo', id => {
        console.log('hhhhh')
        clearInterval(timer)
        socket.emit('data', {
            eventName: 'UserInfo',
            data: {
                name: '张三',
                age: '11岁'
            }
        })
    })
})
server.listen(8000, () => {
    console.log('listenling')
})
