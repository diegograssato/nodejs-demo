/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { env } from "./env";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

import { ErrorMiddleware } from "./adapter/rest/middlewares/ErrorMiddleware";
import { NotFoundMiddleware } from "./adapter/rest/middlewares/NotFoundMiddleware";

import router from "./adapter/rest/routes/index";

process.on("uncaughtException", (e) => {
    console.log(e);
});

process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});
class App {
    public server;
    public swaggerUi = require("swagger-ui-express");
    public swaggerSpec = require("./utils/swagger");

    constructor() {
        this.server = express();

        this.middlewares();
        this.swagger();
        this.routes();
        this.handlers();
        this.start();
    }

    public start(): void {
        const port = env.app.port;
        this.server.set("port", port);

        this.server
            .listen(port, () => {
                const startupMsg = `${env.app.name} running. Listening on port ${port}`;
                console.log(startupMsg);
            })
            .on("error", (error: any) => {
                if (error.errno === "EADDRINUSE") {
                    console.log(
                        `Porta ${error.port} já está sendo utilizada por outro processo.`
                    );
                } else {
                    console.log(error.message);
                }
            });
    }

    handlers(): void {
        this.server.use(ErrorMiddleware.errorHandler);
        this.server.use(NotFoundMiddleware.notFoundHandler);
    }

    middlewares(): void {
        /** Logging */
        this.server.use(morgan("dev"));

        // require('./swagger-setup')(this.server)
        /** Parse the request */
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(express.json());
        // parse incoming request body and append data to `req.body`
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(helmet());
        this.server.use(compression());
        this.server.use(cors());
        /** Takes care of JSON data */
        this.server.use(express.json());
    }

    swagger(): void {
        const options = {
            customCss: ".swagger-ui .topbar { display: none }",
        };
        this.server.use(
            "/swagger",
            this.swaggerUi.serve,
            this.swaggerUi.setup(this.swaggerSpec.getSwaggerJSDoc(), options)
        );
        this.server.get("/swagger.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(this.swaggerSpec.getSwaggerJSDoc());
        });
    }

    routes(): void {
        this.server.use(router);
    }
}

export default new App().server;
