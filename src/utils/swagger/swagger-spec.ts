import swaggerJSDoc from "swagger-jsdoc";

// import { version, name, description } from '../../../package.json'
import { env } from "../../env";
/**
 * Swagger Setup
 */

export function getSwaggerJSDoc(): any {
    const options = {
        definition: {
            info: {
                title: `Documentation for ${env.app.name} project.`,
                version: env.app.version,
                description: env.app.description,
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
    // initialize swagger-jsdoc
    return swaggerJSDoc(options);
}
