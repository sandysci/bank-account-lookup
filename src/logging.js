"use strict";
require("./graylog");

const logger = (error, stack, additionalMessage, isCritical = false) => {
    console.log(error, stack, additionalMessage, isCritical);
    if (process.env.NODE_ENV != "development") {
        if(isCritical)
            graylog.critical(error, stack, additionalMessage, new Date());
        else
            graylog.error(error, stack, additionalMessage, new Date());

    }

};
process.on("uncaughtException", (ex) => {
    logger(ex.message, ex.stack, {
        error: ex.toString()
    });
    process.exit(0);
});

process.on("uncaughtRejection",(ex) => {
    logger(ex.message, ex.stack, {
        error: ex.toString()
    });
    process.exit(0);
});


process.on("unhandledRejection",(ex) => {
    logger(ex.message, ex.stack, {
        error: ex.toString()
    });
    process.exit(0);
});

global.logger = logger;

global.resolveAxiosError = error => {
    let formattedError;
    try {
        if(error && error.response){
            formattedError = {
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data.error,
                url: error.response.config.url,
                params: error.response.config.params,
                data: error.response.config.data,
                headers: error.response.headers,
                raw: error.response.data
            };
        }else{
            formattedError =  {
                status: 500,
                statusText: error.message || "Unknown Error",
                message: error.message || "Oops, An Error Occurred",
                stack: error.stack
            };
        }

    } catch (ex) {
        formattedError = {
            status: 500,
            statusText: "Unknown Error",
            message: "Oops, An Error Occurred",
            error: ex.message,
            stack: ex.stack
        };
    }finally {
        logger(formattedError.message, formattedError.stack || {}, formattedError);
    }
    return formattedError;
};