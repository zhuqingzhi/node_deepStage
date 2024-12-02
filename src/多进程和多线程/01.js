const http = require('http')
const cluster = require('cluster')
const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCpus; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log('worker '+worker.process.id+' died')
    })
} else {
    http.createServer((req, res) => {
        res.write('xxxx')
        res.end()
    }).listen(8000, () => {
        console.log('started')
    })
}