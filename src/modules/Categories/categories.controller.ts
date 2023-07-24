import { FastifyReply, FastifyRequest } from "fastify";
import { createCategoryInput } from "./categories.schema";
import { createCategory, getCategories } from "./categories.service";

export async function createCategoryHandler(
  request: FastifyRequest<{ Body: createCategoryInput }>,
  reply: FastifyReply
) {
  const category = await createCategory({
    ...request.body,
  });

  return category;
}

export async function getCategoryHandler() {
  const categories = await getCategories();

  return categories;
}
