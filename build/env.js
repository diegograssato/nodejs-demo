"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const pkg = __importStar(require("../package.json"));
const config_1 = __importDefault(require("config"));
const os_1 = __importDefault(require("os"));
exports.env = {
    node: process.env.NODE_ENV || "DEV",
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "CI",
    app: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        host: os_1.default.hostname(),
        port: process.env.PORT || config_1.default.get("app.port"),
    },
    api: {
        autenticacao: config_1.default.get("api.autenticacao"),
    },
    security: {
        secret: config_1.default.get("security.secret"),
    },
};
