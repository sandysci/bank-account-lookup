"use strict";
const Joi = require("@hapi/joi");


/**
 * This validate method relies heavily on the @hapi/Joi package
 * @param schema
 * @param payload
 */
function validate(schema, payload) {

    schema = Joi.object(schema);
    const {error, value} = schema.validate( payload,{
        allowUnknown: true,
    });

    if(error)
        return error.details[0].message.replace(/['"]/g, '');
    return null;
}

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
    Constants: require("./src/Constants"),
    formatPhoneNumber,
    validate
};