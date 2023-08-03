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
exports.deleteProductHandler = exports.findProductHandler = exports.getProductsHandler = exports.createProductHandler = void 0;
const products_service_1 = require("./products.service");
const sharp_1 = __importDefault(require("sharp"));
function createProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        process.env.ROOT_PATH = __dirname;
        const { name, picture, category_id } = request.body;
        const pictureUrl = `../../uploads/${request.body.file[0].filename}`;
        const pictureName = request.body.file[0].filename;
        const input = {
            name,
            picture: pictureName,
            category_id,
        };
        try {
            console.log("LOC ", request.body.file);
            const file = request.body.file[0];
            if (file)
                yield (0, sharp_1.default)(file.data)
                    .resize(3200, 3200) // Resize the image to 3200x3200 pixels
                    .toFile(`.${pictureUrl}`);
            const category = yield (0, products_service_1.createProduct)(input);
            return category;
        }
        catch (error) {
            return error;
        }
    });
}
exports.createProductHandler = createProductHandler;
function getProductsHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, products_service_1.getProducts)();
        return products;
    });
}
exports.getProductsHandler = getProductsHandler;
function findProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(request.params.productId, 10);
        try {
            const product = yield (0, products_service_1.findProduct)(productId);
            if (!product) {
                return reply.code(404).send({ message: "Product not found" });
            }
            return product;
        }
        catch (error) {
            return reply.code(500).send({});
        }
    });
}
exports.findProductHandler = findProductHandler;
function deleteProductHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(request.params.productId, 10);
        try {
            const product = yield (0, products_service_1.deleteProduct)(productId);
            if (!product) {
                return reply.code(404).send({ message: "Product not found" });
            }
            return { message: "Product deleted successfully" };
        }
        catch (error) {
            return reply.code(500).send({ message: "Error deleting product" });
        }
    });
}
exports.deleteProductHandler = deleteProductHandler;
