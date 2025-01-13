Node.js中的Stream主要有四种类型：

Readable（可读流）：数据可以从流中读取。
Writable（可写流）：数据可以写入流中。
Duplex（双工流）：既是可读流又是可写流，例如TCP套接字。
Transform（转换流）：在读取和写入过程中可以修改或转换数据，它也是一个Duplex流。