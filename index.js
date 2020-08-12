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
/**
 * This method returns a banklist of possible banks with the account number
 * @param accountNumber
 * @return undefined|array
 */
function accountNumberLookup  (accountNumber) {
    //if accountnumber is empty return undefined
    if(!accountNumber)
        return undefined;
    return require("./src/BankAccountLookUp").getAccountBanks(accountNumber);

};



module.exports = {
    formatPhoneNumber,
    accountNumberLookup,
    // auths: require("./src/auths"),
    graylog: require("./src/graylog"),
    logging: require("./src/logging")
};