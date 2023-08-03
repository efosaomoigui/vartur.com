import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "./products.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  getProducts,
} from "./products.service";
import fs from "fs";
import sharp from "sharp";

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) {
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
      await sharp(file.data)
        .resize(3200, 3200) // Resize the image to 3200x3200 pixels
        .toFile(`.${pictureUrl}`);

    const category = await createProduct(input);

    return category;
  } catch (error) {
    return error;
  }
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}

export async function findProductHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  const productId = parseInt(request.params.productId, 10);

  try {
    const product = await findProduct(productId);

    if (!product) {
      return reply.code(404).send({ message: "Product not found" });
    }
    return product;
  } catch (error) {
    return reply.code(500).send({});
  }
}

export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  const productId = parseInt(request.params.productId, 10);

  try {
    const product = await deleteProduct(productId);

    if (!product) {
      return reply.code(404).send({ message: "Product not found" });
    }

    return { message: "Product deleted successfully" };
  } catch (error) {
    return reply.code(500).send({ message: "Error deleting product" });
  }
}
