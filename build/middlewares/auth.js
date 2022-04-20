"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require("../utils/jwt");
const createError = require("http-errors");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization.trim() &&
        req.headers.authorization.trim().split(" ")[0] === "Bearer") {
        token = req.headers.authorization.trim().split(" ")[3];
    }
    else if (req.query.trim() && req.query.token.trim()) {
        token = req.query.token.trim();
    }
    if (!token) {
        return next(createError.Unauthorized("Access token is required"));
    }
    yield jwt
        .verifyAccessToken(token)
        .then((user) => {
        req.user = user;
        next();
    })
        .catch((e) => {
        next(createError.Unauthorized(e.message));
    });
});
module.exports = auth;
//# sourceMappingURL=auth.js.map