"use strict";
require("dotenv").config();
const expect = require('chai').expect;
const index = require("../index");
const debug = require("debug")("app:debug");
const Joi = require("@hapi/joi");



describe('# should Validate Data', function () {
    it.only('should fail validation', async function () {
        let schema = {
            name: Joi.string().required(),
            age: Joi.number().required()
        };

        let payload = {};
        const response = index.validate(schema, payload);
        expect(response).to.be.not.null;
        console.log(JSON.stringify(response));
    });

    it.only('should pass validation', async function () {
        let schema = {
            name: Joi.string().required(),
            age: Joi.number().required()
        };

        let payload = {
            name: "name",
            age: 10
        };
        const response = index.validate(schema, payload);
        expect(response).to.be.null;
        console.log(JSON.stringify(response));
    });
});