const { error } = require('console')
const EventEmitter = require('events')
const fs = require('fs')
const path=require('path')
const emitter = new EventEmitter()
const filePath = path.resolve(__dirname, './src/data/a.txt')
emitter.addListener('success', data => {
    console.log('success:', data)
    readFile(filePath)
})
function readFile(filePath) {
    fs.readFile(filePath, ((error, data) => {
        if (error) error()
        console.log('data', data.toString())
    }))
    setImmediate(() => {
        console.log('immediate3')
    })
    setImmediate(() => {
        console.log('immediate4')
    })
}
emitter.emit('success', 'start')
setImmediate(() => {
    console.log('immediate1')
})
setImmediate(() => {
    console.log('immediate2')
})