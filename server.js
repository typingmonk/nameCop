var http = require("http");
var url = require("url");

function startServer(router, handler, copLogic, config) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            //console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        request.addListener("end", function() {
            router(response, pathname, postData, handler, copLogic, config);
        })
    }
    http.createServer(onRequest).listen(config.port);
    console.log("Server has started.");
}

exports.startServer = startServer;