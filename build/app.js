"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const ErrorMiddleware_1 = require("./adapter/rest/middlewares/ErrorMiddleware");
const NotFoundMiddleware_1 = require("./adapter/rest/middlewares/NotFoundMiddleware");
const index_1 = __importDefault(require("./adapter/rest/routes/index"));
process.on("uncaughtException", (e) => {
    console.log(e);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});
class App {
    constructor() {
        this.swaggerUi = require("swagger-ui-express");
        this.swaggerSpec = require("./utils/swagger");
        this.server = (0, express_1.default)();
        this.middlewares();
        this.swagger();
        this.routes();
        this.handlers();
        this.start();
    }
    start() {
        const port = env_1.env.app.port;
        this.server.set("port", port);
        this.server
            .listen(port, () => {
            const startupMsg = `${env_1.env.app.name} running. Listening on port ${port}`;
            console.log(startupMsg);
        })
            .on("error", (error) => {
            if (error.errno === "EADDRINUSE") {
                console.log(`Porta ${error.port} já está sendo utilizada por outro processo.`);
            }
            else {
                console.log(error.message);
            }
        });
    }
    handlers() {
        this.server.use(ErrorMiddleware_1.ErrorMiddleware.errorHandler);
        this.server.use(NotFoundMiddleware_1.NotFoundMiddleware.notFoundHandler);
    }
    middlewares() {
        this.server.use((0, morgan_1.default)("dev"));
        this.server.use(express_1.default.urlencoded({ extended: false }));
        this.server.use(express_1.default.json());
        this.server.use(body_parser_1.default.json());
        this.server.use(body_parser_1.default.urlencoded({ extended: true }));
        this.server.use((0, helmet_1.default)());
        this.server.use((0, compression_1.default)());
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
    }
    swagger() {
        const options = {
            customCss: ".swagger-ui .topbar { display: none }",
        };
        this.server.use("/swagger", this.swaggerUi.serve, this.swaggerUi.setup(this.swaggerSpec.getSwaggerJSDoc(), options));
        this.server.get("/swagger.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(this.swaggerSpec.getSwaggerJSDoc());
        });
    }
    routes() {
        this.server.use(index_1.default);
    }
}
exports.default = new App().server;
