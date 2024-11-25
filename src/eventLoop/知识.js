/* 
    在nodejs中 setTimeout(demo,0)===setTimeout(demo,1)
    在浏览器中，settimeout(demo,0)===settimeout(demo,4)
    因为evetloop的启动也需要事件的，可能执行到 poll阶段已经超过了1ms，此时settimeout会先执行，反之setimmediate先执行

    process.nexttick不在evetloop任何阶段执行，而是在各个阶段中间执行

*/
const fs = require('fs')
fs.readFile('./a.txt', () => {
    console.log('hhh')
})
setImmediate(() => {
    console.log('immediate')
})