const fs = require('fs')
const { Transform } = require('stream')
const readStream = fs.createReadStream('./data/文本.txt', 'utf8')

readStream.on('data', chunk => {
    console.log('received',chunk.toString())
})
readStream.on('end', () => {
    console.log('ended')
})
readStream.on('error', e => { 
    console.log('error',e)
})

const writeStream = fs.createWriteStream('./data/dd.txt', 'utf-8')
/* readStream.pipe(writeStream) */

// 转换流
const myStream = new Transform({
    transform(chunk, encoding, callback) {
        // 处理转换数据
        const data = chunk.toString().charCodeAt().toString()
        this.push(data)
        callback()
    }
})
readStream.pipe(myStream).pipe(writeStream)