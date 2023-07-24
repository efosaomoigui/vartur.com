import prisma from "../../utils/prisma";
import { CreateProductInput } from "./products.schema";

export async function createProduct(input: CreateProductInput) {
  return prisma.product.create({
    data: input,
  });
}

export function getProducts() {
  return prisma.product.findMany({
    select: {
      created_at: true,
      updated_at: true,
    },
  });
}
