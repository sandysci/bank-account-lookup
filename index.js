"use strict";

/**
 * This method formats a Nigerian Phone number
 * @param {string} phoneNumber
 * @return "+234xxxxxxxxx"|undefined|array
 */
function formatPhoneNumber(phoneNumber, countryCode = "NG"){
    if(!phoneNumber)
        return undefined;
    //if phone number is empty return undefined
    if(Array.isArray(phoneNumber)){
        return phoneNumber.map(phone => {
           return require("./src/PhoneNumber").format(phone, countryCode);
        });
    }else{
        return require("./src/PhoneNumber").format(phoneNumber, countryCode);
    }
}



module.exports = {
    formatPhoneNumber,
    // auths: require("./src/auths"),
    graylog: require("./src/graylog"),
    logging: require("./src/logging")
};