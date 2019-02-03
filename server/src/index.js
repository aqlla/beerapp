"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 8080; // default port to listen
app.get("/", function (req, res) {
    // render the index template
    res.send("hi");
});
// start the express server
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
