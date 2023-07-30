import { FastifyReply, FastifyRequest } from "fastify";
import { createCategoryInput } from "./categories.schema";
import getCategoryTree, {
  createCategory,
  getCategories,
  getCategoriesWithProductCount,
} from "./categories.service";

import fs from "fs";
import sharp from "sharp";

export async function createCategoryHandler(
  request: FastifyRequest<{ Body: createCategoryInput }>,
  reply: FastifyReply
) {
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
    console.log("LOC ", request.body.file);
    const file = request.body.file[0];

    if (file)
      await sharp(file.data)
        .resize(3200, 3200) // Resize the image to 3200x3200 pixels
        .toFile(`.${pictureUrl}`);

    const category = await createCategory(input);

    return category;
  } catch (error) {
    return error;
  }
}

export async function getCategoryHandler() {
  const categories = await getCategories();
  return categories;
}

export async function getCategoryTreeHandler() {
  const categories = await getCategoryTree();
  return categories;
}

export async function getCategoriesWithProductCountHandler() {
  const categories = await getCategoriesWithProductCount();
  return categories;
}
