http://socket.io


yarn add express
```js
io.on('connection',socket=>{
    io.emit('online',socket.id)
})
io的emit和socket的on和emit的区别
// 广播
io.emit()// 通知所有人 

io.sockets.emit('online',socket.id)//发给指定id 

socket.broadcast.emit//除自己以外发给其他人

遍历
var userMap=new Map()
// 用户进入连接
io.on('connection',socket=>{
    userMap.set(socket.id,socket)
})
for(var client of userMap.values()){
    client.emit('xx')
}

// 私聊就是找到指定的socket
```