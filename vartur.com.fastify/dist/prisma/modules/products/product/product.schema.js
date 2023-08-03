"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.productSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const productInput = {
    title: zod_1.z.string(),
    price: zod_1.z.number(),
    content: zod_1.z.string().optional(),
};
const productGenerated = {
    id: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
};
const createProductSchema = zod_1.z.object(Object.assign({}, productInput));
const productResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, productInput), productGenerated));
const productsResponseSchema = zod_1.z.array(productResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
}), exports.productSchemas = _a.schemas, exports.$ref = _a.$ref;
