const net = require('net')
const connection = net.createConnection(8000)
connection.on('connect', () => {
    console.log('connected')

})
connection.on('data', data => {
    console.log(data.toString())
})
connection.on('close', () => {
    console.log('closed')
})