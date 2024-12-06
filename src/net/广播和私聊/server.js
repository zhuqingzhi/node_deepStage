const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { initIO } = require("./socketIO");
const { router } = require('./socketIO/routes')
const cors=require('cors')
const app = express();
app.use(cors())
app.use(router)
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
});
initIO(io)

httpServer.listen(3000);