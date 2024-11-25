/* 
timer:定时器；settimeout,setinterval
I/O 回调：此阶段执行几乎所有的回调函数，除了关闭回调，setimmediate
idle空转,prepare:只在内部使用
poll:轮询，检索新的IO事件，恰当的时候node会阻塞这个阶段
check:检查，setimmediate()设置的回调会在此阶段被调用
close callback:关闭事件的回调，socket.on('close)
事件循环的每次运行之间，nodejs会检查他是否在等待异步IO或者定时器，如果没有就自动关闭


在node中，并排的IO读取的回调将会在当前事件循环中执行完成
*/