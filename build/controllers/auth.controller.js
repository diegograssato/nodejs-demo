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
var _a;
const auth = require("../services/auth.service");
const createError = require("http-errors");
class authController {
}
_a = authController;
authController.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth.register(req.body);
        res.status(200).json({
            status: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (e) {
        next(createError(e.statusCode, e.message));
    }
});
authController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield auth.login(req.body);
        res.status(200).json({
            status: true,
            message: "Account login successful",
            data,
        });
    }
    catch (e) {
        next(createError(e.statusCode, e.message));
    }
});
authController.all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield auth.all();
        res.status(200).json({
            status: true,
            message: "All users",
            data: users,
        });
    }
    catch (e) {
        next(createError(e.statusCode, e.message));
    }
});
module.exports = authController;
//# sourceMappingURL=auth.controller.js.map