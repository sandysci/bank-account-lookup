"use strict";
require("dotenv").config({});

const utils = require("../index");
describe('# Test for possible bank name for account number',  () => {
    it('should return Array of banklist for a valid acount number ', function () {
        let accountNumber = "0005516510";
        let accountNumberLookup = utils.accountNumberLookup(accountNumber);
        console.log("Banklist",accountNumberLookup);
        expect(accountNumberLookup).toBe(Array);
    });

    it('should return an empty array', function () {
        let accountNumber = "1848758949";
        let accountNumberLookup = utils.accountNumberLookup(accountNumber);
        console.log("Banklist",accountNumberLookup);
        expect(accountNumberLookup.length).toBe(0);
    });

});