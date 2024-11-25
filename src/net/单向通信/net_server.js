const { error } = require('console')
const net = require('net')

const netServer = net.createServer()
netServer.listen(8000)
netServer.on('connection', (connection) => {
    console.log('连接上了..')
    var index = 0;
    connection.on('lookup', (err, address) => {
        console.log('lookup')
    })
})