import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "./products.schema";
import { createProduct, getProducts } from "./products.service";

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) {
  const product = await createProduct({
    ...request.body,
  });

  return product;
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}
