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
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const createError = require("http-errors");
class authService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            data.password = bcrypt.hashSync(data.password, 8);
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                user = yield prisma.user.create({
                    data,
                });
            }
            else {
                console.log("Ja existe");
                console.log(user);
            }
            data.accessToken = yield jwt.signAccessToken(user);
            return data;
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                throw createError.NotFound("User not registered");
            }
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword)
                throw createError.Unauthorized("Email address or password not valid");
            delete user.password;
            const accessToken = yield jwt.signAccessToken(user);
            return Object.assign(Object.assign({}, user), { accessToken });
        });
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield prisma.user.findMany();
            return allUsers;
        });
    }
}
module.exports = authService;
//# sourceMappingURL=auth.service.js.map