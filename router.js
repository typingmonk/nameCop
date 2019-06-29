function router(response, pathname, postData, handler, copLogic, config) {
    //console.log("About to route a request for " + pathname);
    if (pathname === "/"+config.telegramToken) {
        // using token as pathname to make sure request is send by Telegram API.
        handler(response, postData, copLogic, config);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.router = router;