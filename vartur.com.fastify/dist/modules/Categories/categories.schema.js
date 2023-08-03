"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.cateogrySchemas = exports.categoriesResponseSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const categoryInput = {
    name: zod_1.z.string(),
    picture: zod_1.z.string(),
    parent_id: zod_1.z.number(),
    file: zod_1.z.any(),
};
const cateogryGenerated = {
    id: zod_1.z.number(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
};
const createCategorySchema = zod_1.z.object(Object.assign({}, categoryInput));
const CategoryResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, categoryInput), cateogryGenerated));
exports.categoriesResponseSchema = zod_1.z.array(CategoryResponseSchema);
const categoriesWithChildrenResponseSchema = zod_1.z.object(Object.assign(Object.assign(Object.assign({}, categoryInput), { children: exports.categoriesResponseSchema }), cateogryGenerated));
const categoriesWithProductResponseSchema = zod_1.z.object(Object.assign(Object.assign(Object.assign(Object.assign({}, categoryInput), { children: exports.categoriesResponseSchema }), cateogryGenerated), { products: exports.categoriesResponseSchema }));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createCategorySchema,
    CategoryResponseSchema,
    categoriesResponseSchema: exports.categoriesResponseSchema,
    categoriesWithChildrenResponseSchema,
}, { $id: "categorySchemas" }), exports.cateogrySchemas = _a.schemas, exports.$ref = _a.$ref;
