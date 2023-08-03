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
exports.deleteCategory = exports.getCategoriesWithProductCount = exports.getCategories = exports.createCategory = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
function createCategory(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma_1.default.category.create({
                data: input,
            });
        }
        catch (error) {
            throw new Error("Error creating category");
        }
    });
}
exports.createCategory = createCategory;
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const allCategories = yield prisma_1.default.category.findMany();
        return allCategories;
    });
}
exports.getCategories = getCategories;
function getCategoriesWithProductCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const allCategories = yield prisma_1.default.category.findMany({
            include: {
                products: true,
            },
        });
        const categoriesWithCount = allCategories.map((category) => (Object.assign(Object.assign({}, category), { productCount: getProductCount(category.id, allCategories), parent: getParentName(category.parent_id, allCategories) })));
        return categoriesWithCount;
    });
}
exports.getCategoriesWithProductCount = getCategoriesWithProductCount;
function getParentName(parentId, allCategories) {
    const category = allCategories.find((c) => c.id === parentId);
    if (!category)
        return "--No Parent--";
    return category.name;
}
function getProductCount(categoryId, allCategories) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = 0;
        const category = allCategories.find((c) => c.id === categoryId);
        if (!category)
            return 0;
        count += category.products.length;
        const children = allCategories.filter((c) => c.parent_id === categoryId);
        for (const child of children) {
            count += yield getProductCount(child.id, allCategories);
        }
        return count;
    });
}
const getCategoryTree = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma_1.default.category.findMany();
    const categoriesMap = new Map();
    categories.forEach((category) => {
        categoriesMap.set(category.id, Object.assign(Object.assign({}, category), { children: [] }));
    });
    // console.log("MAP: ", categoriesMap);
    const rootCategories = [];
    categories.forEach((category) => {
        if (!category.parent_id) {
            rootCategories.push(categoriesMap.get(category.id));
        }
        else {
            categoriesMap
                .get(category.parent_id)
                .children.push(categoriesMap.get(category.id));
        }
    });
    // console.log("ROOT: ", rootCategories);
    return rootCategories;
});
exports.default = getCategoryTree;
function deleteCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the category exists in the database
            const category = yield prisma_1.default.category.findUnique({
                where: { id: categoryId },
            });
            if (!category) {
                return null;
            }
            // Delete the category and any associated products (if needed)
            yield prisma_1.default.category.delete({ where: { id: categoryId } });
            // You may also need to delete associated products if required
            yield prisma_1.default.product.deleteMany({ where: { category_id: categoryId } });
            return category;
        }
        catch (error) {
            throw new Error("Error deleting category");
        }
    });
}
exports.deleteCategory = deleteCategory;
