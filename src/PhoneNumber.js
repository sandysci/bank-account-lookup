"use strict";
const _ = require("lodash");

module.exports = {
    format: (phoneNumber) => {
        if(_.isEmpty(phoneNumber))
            return phoneNumber;

        phoneNumber = phoneNumber.toString().replace(/\D/g, "");
        if (phoneNumber.startsWith("234"))
            return phoneNumber;

        phoneNumber = Number(phoneNumber.substr((phoneNumber.length - 10), phoneNumber.length));
        return phoneNumber ? `234${phoneNumber}` : undefined;
    }
};