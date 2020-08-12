"use strict";
require("dotenv").config({});
require("../src/logging");
describe('# Test Logger',  () => {
    it('should return undefined for incorrect or empty value', function () {
        logger("AN Error to log", {}, {});
    });
});