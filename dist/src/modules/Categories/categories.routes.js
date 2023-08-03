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
Object.defineProperty(exports, "__esModule", { value: true });
const categories_controller_1 = require("./categories.controller");
const categories_schema_1 = require("./categories.schema");
function categoryRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/", {
            schema: {
                body: (0, categories_schema_1.$ref)("createCategorySchema"),
                response: {
                    201: (0, categories_schema_1.$ref)("createCategorySchema"),
                },
                consumes: ["multipart/form-data"],
            },
        }, categories_controller_1.createCategoryHandler);
        server.get("/", {
            schema: {
                response: {
                    200: (0, categories_schema_1.$ref)("categoriesResponseSchema"),
                },
            },
        }, categories_controller_1.getCategoryHandler);
        server.get("/categoryTree", {}, categories_controller_1.getCategoryTreeHandler);
        server.delete("/:categoryId", {}, categories_controller_1.deleteCategoryHandler);
        server.get("/categoryWithProductCount", {}, categories_controller_1.getCategoriesWithProductCountHandler);
    });
}
exports.default = categoryRoutes;
