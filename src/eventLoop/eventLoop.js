/* 
浏览器的异步事件：dom事件，ajax,settimeout,setinterval,promise callback，await 后面的代码，,$nexttick
    宏任务：IO，UI rendering；main
    微任务：定时器，observer
node 异步事件：ajax,settimeout,setinterval,promise callback,，await 后面的代码，nexttick,setimmediate,i/o读写
回调将会进入事件循环队列，需要掌握每种异步事件回调入队规则及出队

主线程上的同步代码形成执行栈
此外还维护一个事件循环队列去保存异步代码的回调，当执行栈上的同步代码执行完毕后，事件循环队列里面的回调进行轮询状态，满足执行条件后，结束等待状态，依次进入执行栈执行
事件循环队列可能分为多种，宏任务队列和微任务队列等;都满足执行条件的回调则依次出队执行

比如settimeout函数是立即返回了一个定时器的handler，而回调是异步的


当当前轮的宏任务执行完毕后，开始执行微任务队列，必须要等微任务队列清空后，才会进入下次循环
每执行完一轮宏任务和微任务就叫一环事件


setImmediate 是微任务，但它的执行时机是在当前宏任务结束后，所有当前宏任务中的微任务（如 Promise 回调、process.nextTick 等）执行完毕后，但在下一个宏任务开始之前。
这意味着 setImmediate 会在当前事件循环迭代的微任务阶段之后执行。setimmediate始终插入到当前宏任务结束后的微任务队列的末尾
，nexttick为宏任务，但是会在当前调用栈清空后立即执行，并且在微任务队列前；在当前宏任务的末尾和微任务队列开始之前插入回调。
具体来说，process.nextTick 的行为如下：

当前宏任务执行中：在当前宏任务（例如，主脚本执行、setTimeout、setInterval 等）执行的过程中。

nextTick 回调安排：当你调用 process.nextTick 时，Node.js 会将提供的回调函数添加到一个特殊的队列中，这个队列会在当前宏任务结束后立即被处理。

当前宏任务结束：一旦当前宏任务完成，事件循环会检查 nextTick 队列，并执行其中的所有回调。

微任务执行之前：nextTick 回调会在任何其他微任务（如 Promise 回调）之前执行，这意味着它们会在微任务队列开始处理之前完成
宏任务1(同步代码执行，异步回调入队)--->nexttick队列--->微任务队列(promise等在宏任务1中顺序注册的回调--->setimmediate)--->下一个宏任务


您提供的执行顺序基本上是正确的，它描述了 Node.js 事件循环中宏任务、`nextTick` 队列和微任务队列的处理流程。这里是一个更详细的解释，以及对您的顺序的一些补充：

1. **宏任务1（同步代码执行，异步回调入队）**：
   - 这是当前正在执行的宏任务，包括同步代码和异步操作的注册，如 `setTimeout`、`setImmediate` 和 I/O 操作等。

2. **`nextTick` 队列**：
   - 在宏任务执行结束后，`nextTick` 队列中的回调会被处理。这些回调是在当前宏任务中通过 `process.nextTick` 注册的，它们会在任何微任务之前执行。

3. **微任务队列**：
   - 微任务队列包含了在当前宏任务中注册的所有微任务，如 Promise 回调（`.then()`、`.catch()`、`.finally()`）和 `MutationObserver` 回调等。这些微任务在 `nextTick` 回调之后执行。

4. **`setImmediate`**：
   - `setImmediate` 回调被添加到微任务队列的末尾，它们在当前宏任务中的所有微任务执行完毕后执行，但在下一个宏任务开始之前。

5. **下一个宏任务**：
   - 在当前宏任务中的所有 `nextTick` 回调和微任务（包括 `setImmediate`）执行完毕后，事件循环会进入下一个宏任务。

补充说明：

- **事件循环检查**：
  - 在处理完 `nextTick` 队列和微任务队列后，事件循环会检查是否有新的宏任务（如新的 `setTimeout` 或 `setInterval` 回调）需要执行。

- **宏任务队列的顺序**：
  - 宏任务队列中的回调按照它们被注册的顺序执行，包括 I/O 回调、定时器回调等。

- **宏任务与微任务的循环**：
  - 事件循环会重复上述过程，不断检查宏任务队列和微任务队列，直到两者都为空。

- **异步 I/O 操作**：
  - 异步 I/O 操作完成后，它们的回调会被添加到宏任务队列中，等待下一轮事件循环迭代。

- **错误处理**：
  - 如果在执行过程中发生错误，它们会被传递给事件循环的 `'uncaughtException'` 或 Promise 的 `'unhandledRejection'` 事件。

这个顺序和补充说明了 Node.js 事件循环的基本结构，以及如何在宏任务、`nextTick` 队列和微任务队列之间进行调度。理解这个顺序对于编写高效的异步代码至关重要。

一轮事件循环，会执行一次宏任务，以及所有的微任务

*/
const {performance}=require('perf_hooks');
const { nextTick } = require('process');
async function func1() {
    setTimeout(() => {
        console.log('111')
        nextTick(() => {
            console.log('101')
        })
        setTimeout(() => {
            console.log('222')
        }, 1000);
    }, 1000);
    setImmediate(() => {
        console.log('333')
    })
    setTimeout(() => {
        console.log('301')
    }, 0);
    nextTick(() => {
        console.log('444')
        nextTick(() => {
            console.log('555')
        })
    })
    var now=performance.now()
    while ((performance.now()-now) < 1100) { }
    console.log('666')
    await new Promise((resolve) => {
        console.log('777')
        setTimeout(() => {
            resolve('')
        }, 1000);
    })
    console.log('888')
}
//666 777 444 555 333 111 101 301 888 222
func1()