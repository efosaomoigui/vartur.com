"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.productSchemas = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const productInput = {
    name: zod_1.z.string(),
    picture: zod_1.z.string(),
    category_id: zod_1.z.number(),
    file: zod_1.z.any(),
};
const productGenerated = {
    id: zod_1.z.number(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
};
exports.createProductSchema = zod_1.z.object(Object.assign({}, productInput));
const productResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, productInput), productGenerated));
const productsResponseSchema = zod_1.z.array(productResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createProductSchema: exports.createProductSchema,
    productResponseSchema,
    productsResponseSchema,
}, { $id: "productSchemas" }), exports.productSchemas = _a.schemas, exports.$ref = _a.$ref;
