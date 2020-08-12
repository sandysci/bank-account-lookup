"use strict";
require("dotenv").config({});

const utils = require("../index");

describe('# Test for possible banks for an account number',  () => {
    it('should return undefined for incorrect or empty value', function () {
        let accountNumber = undefined;
        let accountNumberLookup = utils.accountNumberLookup(accountNumber);
        console.log("Banklist",accountNumberLookup);
        expect(accountNumber).toBeUndefined();
    });
    it('should return Array of banklist for a valid acount number ', function () {
        let accountNumber = "0005516510";
        let accountNumberLookup = utils.accountNumberLookup(accountNumber);
        console.log("Banklist",accountNumberLookup,typeof(accountNumberLookup));
        expect(accountNumberLookup.length).toBeGreaterThan(0);
    });

    it('should return an empty array', function () {
        let accountNumber = "1833348758949";
        let accountNumberLookup = utils.accountNumberLookup(accountNumber);
        console.log("Banklist",accountNumberLookup);
        expect(accountNumberLookup.length).toBe(0);
    });

});