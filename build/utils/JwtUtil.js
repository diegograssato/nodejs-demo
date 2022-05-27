"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
class JwtUtil {
    static signAccessToken(payload) {
        const accessTokenSecret = JwtUtil.getTokenSecret();
        if (!accessTokenSecret) {
            throw new Error();
        }
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({ payload }, accessTokenSecret, {}, (err, token) => {
                if (err) {
                    reject(new Error());
                }
                token ? resolve(token) : reject(new Error());
            });
        });
    }
    static verifyAccessToken(token) {
        const accessTokenSecret = JwtUtil.getTokenSecret();
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, accessTokenSecret, {}, (err, payload) => {
                if (err) {
                    return reject(err);
                }
                resolve(payload);
            });
        });
    }
    static getTokenSecret() {
        const accessTokenSecret = String(env_1.env.security.secret);
        if (!accessTokenSecret) {
            throw new Error();
        }
        return accessTokenSecret;
    }
}
exports.JwtUtil = JwtUtil;
