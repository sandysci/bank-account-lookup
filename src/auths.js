"use strict";
const fs   = require('fs');
const jwt  = require('jsonwebtoken');

const i = "wheeler-auth";
const s = "wheeler-agg";
const a = "wheeler-agg";

const privateKEY  = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const publicKEY  = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8');


const signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "8784h",
    algorithm:  "RS256"
};

const  verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn: "48h",
    algorithm:  ["RS256"]
};

exports.generateJWT = (payload) => {
    let options = signOptions;
    if (payload && payload.exp) {
        delete options.expiresIn;
    }
    return jwt.sign(payload, privateKEY, options);
};

exports.verifyJWT = (payload) => {
    return jwt.verify(payload, publicKEY, verifyOptions);
};

