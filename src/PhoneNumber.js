"use strict";
const _ = require("lodash");
const {parsePhoneNumberFromString} = require("libphonenumber-js");
module.exports = {
    format: (phoneNumber, countryCode = "NG") => {
        if (_.isEmpty(phoneNumber))
            return phoneNumber;
        phoneNumber = phoneNumber.toString().replace(/\D/g, "");
        if (!phoneNumber) return;
        phoneNumber = parsePhoneNumberFromString(phoneNumber, countryCode || "NG");
        return `${phoneNumber.countryCallingCode}${phoneNumber.nationalNumber}`;
    },
};