"use strict";

const prefix = "tm-microservices.";
module.exports = {
    ROLE: {
        ADMIN: "admin",
        USER: "user",
    },
    SECURITY: {
        INTERNAL_SECURITY_TOKEN: "INTERNAL_SECURITY_TOKEN",
    },
    CLIENT_DEFAULT: "default",
    SECRET_DEFAULT: "default",
    EVENTS: {
        USER:{
            CREATED: `${prefix}user_created`,
            UPDATED: `${prefix}user_updated`,
            DELETED: `${prefix}user_deleted`
        },
        PRODUCT: {
            CREATED: `${prefix}product_created`,
            UPDATED: `${prefix}product_updated`,
            DELETED: `${prefix}product_deleted`
        },
        INVOICE: {
            CREATED: `${prefix}invoice_created`,
            UPDATED: `${prefix}invoice_updated`,
            DELETED: `${prefix}invoice_deleted`,
            PAID: `${prefix}invoice_paid`,
        }
    },
    QUEUES: {}
};