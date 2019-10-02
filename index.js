"use strict";
const repository  = new (require("./src/ElasticRepository"))();



let trail = async (message, action, meta = {}) => {
    let d = new Date();
    d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    const payload = {
        service: process.env.APP_NAME || "audit-trail",
        message,
        action,
        ...meta,
        timestamp: d.toISOString()
    };

    // console.log("Payload to elastic search", payload);

    return repository.create(payload);
};


let customQuery = async (body) => {
    return await repository.search(body);
};

let fetch = async (query, from, size, keyword) => {
    let body = {query: {bool:{}}}, must = [];
    must = repository.appendMultiplePropertyMatch(query);
    if (from && size) {
        body.from = from;
        body.size = size;
    }
    body.query.bool = {
        must
    };

    return await repository.search(body);
};

let deleteIndex = async () => {
    return repository.deleteIndex();
};
module.exports = {
    trail,
    fetch,
    customQuery,
    deleteIndex
};