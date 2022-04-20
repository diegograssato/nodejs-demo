"use strict";
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const timeout = process.env.ACCESS_TOKEN_TIMEOUT;
module.exports = {
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, { expiresIn: timeout }, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, { expiresIn: timeout }, (err, payload) => {
                if (err) {
                    const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
                    return reject(createError.Unauthorized(message));
                }
                resolve(payload);
            });
        });
    },
};
//# sourceMappingURL=jwt.js.map