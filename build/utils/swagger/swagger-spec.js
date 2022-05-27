"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerJSDoc = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("../../env");
function getSwaggerJSDoc() {
    const options = {
        definition: {
            info: {
                title: `Documentation for ${env_1.env.app.name} project.`,
                version: env_1.env.app.version,
                description: env_1.env.app.description,
                termsOfService: "http://example.com/terms/",
                contact: {
                    name: "API Support",
                    url: "http://www.exmaple.com/support",
                    email: "support@example.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:3333",
                    description: "Ambiente local",
                },
                {
                    url: "http://localhost:3333",
                    description: "Ambiente Homologação",
                },
                {
                    url: "http://localhost:3333",
                    description: "Ambiente Produção",
                },
            ],
        },
        apis: ["./src/adapter/rest/routes/*ts"],
    };
    return (0, swagger_jsdoc_1.default)(options);
}
exports.getSwaggerJSDoc = getSwaggerJSDoc;
