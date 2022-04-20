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
const express = require("express");
const router = express.Router();
const auth = require("./auth");
const createError = require("http-errors");
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.use("/auth", auth);
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(createError.NotFound("Route not Found"));
}));
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message,
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map