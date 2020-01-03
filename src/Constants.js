"use strict";


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
            CREATED: "user_created",
            UPDATED: "user_updated",
            DELETED: "user_deleted"
        },
        PRODUCT: {
            CREATED: "product_created",
            UPDATED: "product_updated",
            DELETED: "product_deleted"
        }
    },
    QUEUES: {}
};