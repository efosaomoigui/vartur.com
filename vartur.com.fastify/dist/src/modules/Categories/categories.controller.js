"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteCategoryHandler = exports.getCategoriesWithProductCountHandler = exports.getCategoryTreeHandler = exports.getCategoryHandler = exports.createCategoryHandler = void 0;
const categories_service_1 = __importStar(require("./categories.service"));
const sharp_1 = __importDefault(require("sharp"));
function createCategoryHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        process.env.ROOT_PATH = __dirname;
        const { name, picture, parent_id } = request.body;
        const pictureUrl = `../../uploads/${request.body.file[0].filename}`;
        const pictureName = request.body.file[0].filename;
        const input = {
            name,
            picture: pictureName,
            parent_id,
        };
        try {
            const file = request.body.file[0];
            if (file)
                yield (0, sharp_1.default)(file.data)
                    .resize(3200, 3200) // Resize the image to 3200x3200 pixels
                    .toFile(`.${pictureUrl}`);
            const category = yield (0, categories_service_1.createCategory)(input);
            return category;
        }
        catch (error) {
            return error;
        }
    });
}
exports.createCategoryHandler = createCategoryHandler;
function getCategoryHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (0, categories_service_1.getCategories)();
        return categories;
    });
}
exports.getCategoryHandler = getCategoryHandler;
function getCategoryTreeHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (0, categories_service_1.default)();
        return categories;
    });
}
exports.getCategoryTreeHandler = getCategoryTreeHandler;
function getCategoriesWithProductCountHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (0, categories_service_1.getCategoriesWithProductCount)();
        return categories;
    });
}
exports.getCategoriesWithProductCountHandler = getCategoriesWithProductCountHandler;
function deleteCategoryHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(request.params.categoryId, 10);
        try {
            const category = yield (0, categories_service_1.deleteCategory)(categoryId);
            if (!category) {
                return reply.code(404).send({ message: "Category not found" });
            }
            return { message: "Category deleted successfully" };
        }
        catch (error) {
            return reply.code(500).send({ message: "Error deleting category" });
        }
    });
}
exports.deleteCategoryHandler = deleteCategoryHandler;
