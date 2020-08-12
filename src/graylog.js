"use strict";
const graylog = require("graylog2");

if(!process.env.GRAYLOG_HOST || !process.env.GRAYLOG_PORT){
    console.error("Graylog PORT/HOST is Missing, Using default..........");
}
const host = process.env.GRAYLOG_HOST || "127.0.0.1";
const port = process.env.GRAYLOG_PORT || "12201";



const logger = new graylog.graylog({
    servers: [
        { host, port},
    ],
    facility: process.env.APP_NAME || Math.random().toString(),
    bufferSize: 1350
});


// setInterval(() => {
//     logger.critical("user Service");
//     console.log("Done");
// }, 2000);


logger.on('error', function (error) {
    console.error('Error while trying to write to graylog2: ', error);
});

global.graylog = logger;
module.exports = logger;