const {Readable}=require('stream')
class MyStream extends Readable{
    constructor(options) {
        super(options)
        this.data = ['a', 'b', 'c']
        this.index=0
    }
    _read(size) {
        if (this.index < this.data.length) {
            this.push(this.data[this.index++])
            if (this.index === this.data.length) {
                this.push(null)
            }
        }
    }
}
const myStream = new MyStream()
myStream.on('data', chunk => {
    console.log('received chunk:',chunk.toString())
})
myStream.on('end', () => {
    console.log('end')
})