"use strict";
require("dotenv").config({});
const Joi = require("@hapi/joi");
const utils = require("../index");
describe('# Test Validate data',  () => {
    it('should return a validation error', function () {
        const schema = {
            name: Joi.string().required()
        };

        const validationResponse = utils.validate(schema, {});
        expect(validationResponse).not.toBeNull();
        console.log("validationResponse", validationResponse);
    });


    it('should return null - Validation passed', function () {
        const schema = {
            name: Joi.string().required()
        };
        const validationResponse = utils.validate(schema, {
            name: "Name"
        });
        expect(validationResponse).toBeNull();
        console.log("validationResponse", validationResponse);
    });
});



describe('# Test Format Phone Number',  () => {
    it('should return undefined for incorrect or empty value', function () {
       let phoneNumber = undefined;
       phoneNumber = utils.formatPhoneNumber(phoneNumber);
       expect(phoneNumber).toBeUndefined();
    });

    it('should return an array of undefined for incorrect or empty value', function () {
        let phoneNumber = [undefined, undefined, undefined];
        phoneNumber = utils.formatPhoneNumber(phoneNumber);
        phoneNumber = phoneNumber.filter(Boolean);
        console.log("PhoneNumber", phoneNumber);
        expect(phoneNumber.length).toBe(0);
    });

    it('should return an formatted phone number', function () {
        let phoneNumber = "08023457890";
        phoneNumber = utils.formatPhoneNumber(phoneNumber);
        console.log("PhoneNumber", phoneNumber);
        expect(phoneNumber).toBe("2348023457890");
    });


    it('should return an array of formatted phone number', function () {
        let phoneNumber = ["08023457890", "08023457846", "08023457811"];
        phoneNumber = utils.formatPhoneNumber(phoneNumber);
        console.log("PhoneNumber", phoneNumber);
        expect(phoneNumber.length).toBe( 3);
    });
});