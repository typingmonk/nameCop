var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler");
var cop = require("./copLogic");
var config = require("./config");

server.startServer(router.router, requestHandlers.handler, cop.copLogic, config);