// exec:执行一个shell脚本，结束返回回调,包含参数
const exec = require('child_process').exec;
exec('ls', (err, stdout, stderr) => {
    console.log(stdout)
})

// 流

// execFile更安全，shell,args,cb(err,stdout,stderr)
// 过滤敏感字符，\,引号

// spawn，创建一个子进程来执行特定命令shell，用法与execFile类似，没有回调

// 标准输出输入都是流对象，可以监听data事件

/* 
    var child=exec('ls')
    child.stdout.on('data',data=>{
    
    })
    chil.stderr.on('data')
    child.on('close')

*/

// child=child_process.fork('./child.js')
// child.on

