"use strict";
require("dotenv").config();
const expect = require('chai').expect;
const audit = require("../index");
describe('# Test Save into elasticsearch', function () {
    it('should save the payload', async function () {
        const payload = await audit.trail("An Activity Occurred", "Activity");
        expect(payload.statusCode).to.be.equal(201);
        expect(payload.body._index).to.be.equal(process.env.AUDIT_INDEX);
        expect(payload.body.result).to.be.equal("created");
        console.log(JSON.stringify(payload));
    });
});


describe('# Test Fetch trail from ES', function () {
    it.only('should fetch the payload using a required query', async function () {
        const payload = await audit.fetch({}, 0, 50);
        expect(payload.data).to.be.an("array");
        expect(payload.data.length).to.be.equal(payload.total);
        console.log(JSON.stringify(payload));
    });


    it('should fetch the payload using a custom query', async function () {
        const query = {
            "query": {"bool": {}},
            "from": 0,
            "size": "10",
            "sort": [{"timestamp": {"order": "desc", "unmapped_type": "date"}}]
        };
        const payload = await audit.customQuery(query);
        // console.log("Payload", JSON.stringify(payload), payload.data.length, payload.total);
        //start assert
        expect(payload.data).to.be.an("array");
        expect(payload.data.length).to.be.equal(payload.total);
    });
});
