const { performance } = require('perf_hooks');
const { nextTick } = require('process');

/* async function func1() {
    setTimeout(() => {
        console.log('111')
    }, 1000);
    nextTick(() => {
        console.log('nexttick')
    })
    await new Promise(resolve => {
        const now=performance.now()
        while ((performance.now() - now) < 5000) {
            
        }
        console.log('hhh')
    })
    
}
func1() */
/* setImmediate(() => {
    console.log('333')
})
setTimeout(() => {
    console.log('301')
}, 0); 
无法预测谁先执行
*/
//在事件循环中，每次打算进入下个阶段之前，必须要先依次反复清空 nextTick 和 promise 队列，直到两个队列完全没有即将要到来的任务的时候再进入下个阶段。
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout0");
}, 0);

setTimeout(function () {
    console.log("setTimeout3");
}, 3);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick"));

async1();

new Promise(function (resolve) {
    console.log("promise1");
    resolve();
    console.log("promise2");
}).then(function () {
    console.log("promise3");
});

console.log("script end");
// promise队列:await async2后面的代码块包装成新任务执行；promise.then
// nexttick队列：nexttick1
// timer队列：timeout0；timeout3;按理说此时应该也过了3ms；计时完成后才会将回调加入timer队列
// check队列：setimmediate
// script start----async1 start--async2--promise1---promise2---script end---nexttick-----async1 end---promise3--
// 同步代码执行完毕，消息队列中仍然有回调，进入事件循环检查---timer执行前清空微队列- - settimeout0-- - settimeout3-- - setimmediate
// 事件循环检查timer(应该两个timeout都满足了，但又说timeout 0 和immediate不知道谁先执行)
// await async2() 立刻执行 async2()，输出 async2 将后续 console.log 任务包装成 Promise.then() 加入 Promise 队列。await后面的表达式立即执行，并且把后续的包装成promise.then加入promise队列