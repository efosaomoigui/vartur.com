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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const users_schema_1 = require("./modules/users/users.schema");
const products_routes_1 = __importDefault(require("./modules/products/products.routes"));
const products_schema_1 = require("./modules/products/products.schema");
const categories_schema_1 = require("./modules/Categories/categories.schema");
const categories_routes_1 = __importDefault(require("./modules/Categories/categories.routes"));
const PORT = 3000;
exports.app = (0, fastify_1.default)();
exports.app.register(cors_1.default, {
    origin: true,
});
exports.app.register(require("fastify-multipart"), {
    addToBody: true,
});
exports.app.register(require("@fastify/swagger"), {});
exports.app.register(require("@fastify/swagger-ui"), {
    routePrefix: "/vartur/docs",
    info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
    },
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        let version = "1.0.0";
        swaggerObject.info = {
            title: "Vartur.com",
            description: `Vartur.com API documentation for version ${version}`,
            version: `${version}`,
        };
        return swaggerObject;
    },
    transformSpecificationClone: true,
});
exports.app.get("/healthCheck", () => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "Hello, Vartur.com" };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const schema of [
        ...users_schema_1.userSchemas,
        ...products_schema_1.productSchemas,
        ...categories_schema_1.cateogrySchemas,
    ]) {
        exports.app.addSchema(schema);
    }
    exports.app.register(users_routes_1.default, { prefix: "api/users" });
    exports.app.register(products_routes_1.default, { prefix: "api/products" });
    exports.app.register(categories_routes_1.default, { prefix: "api/categories" });
    try {
        yield exports.app.listen(PORT, "0.0.0.0");
        console.log("Server started on port 3000");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
start();
