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
exports.findProduct = exports.deleteProduct = exports.getProducts = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
function createProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma_1.default.product.create({
                data: input,
            });
        }
        catch (error) {
            throw new Error("Error creating product");
        }
    });
}
exports.createProduct = createProduct;
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const allCategories = yield prisma_1.default.category.findMany({
            select: { name: true, id: true },
        });
        const allProducts = yield prisma_1.default.product.findMany({
            include: {
                category: true,
            },
        });
        const productsWithCount = allProducts.map((product) => (Object.assign(Object.assign({}, product), { categoryName: getCategoryName(product.category_id, allCategories) })));
        return productsWithCount;
    });
}
exports.getProducts = getProducts;
function getCategoryName(categoryId, allCategories) {
    const category = allCategories.find((c) => c.id === categoryId);
    if (!category)
        return "--No Category--";
    return category.name;
}
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the product exists in the database
            const product = yield prisma_1.default.product.findUnique({
                where: { id: productId },
            });
            if (!product) {
                return null;
            }
            yield prisma_1.default.product.delete({ where: { id: productId } });
            return product;
        }
        catch (error) {
            throw new Error("Error deleting category");
        }
    });
}
exports.deleteProduct = deleteProduct;
function findProduct(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allCategories = yield prisma_1.default.category.findMany({
                select: { name: true, id: true },
            });
            const allProducts = yield prisma_1.default.product.findMany({
                where: { category_id: categoryId },
                include: {
                    category: true,
                },
            });
            const productsWithCount = allProducts.map((product) => (Object.assign(Object.assign({}, product), { categoryName: getCategoryName(product.category_id, allCategories) })));
            return productsWithCount;
        }
        catch (error) {
            throw new Error("Error finding product");
        }
    });
}
exports.findProduct = findProduct;
