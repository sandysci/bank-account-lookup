"use strict";

/**
 * This method formats a Nigerian Phone number
 * @param phoneNumber
 * @return "+234xxxxxxxxx"|undefined|array
 */
function formatPhoneNumber(phoneNumber){
    if(!phoneNumber)
        return undefined;
    //if phone number is empty return undefined
    if(Array.isArray(phoneNumber)){
        return phoneNumber.map(phone => {
           return require("./src/PhoneNumber").format(phone);
        });
    }else{
        return require("./src/PhoneNumber").format(phoneNumber);
    }
}



module.exports = {
    formatPhoneNumber,
    auths: require("./src/auths"),
    graylog: require("./src/graylog"),
    logging: require("./src/logging")
};