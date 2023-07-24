import prisma from "../../utils/prisma";
import { createCategoryInput } from "./categories.schema";

export async function createCategory(input: createCategoryInput) {
  return prisma.category.create({
    data: input,
  });
}

export function getCategories() {
  return prisma.product.findMany({
    select: {
      created_at: true,
      updated_at: true,
    },
  });
}
