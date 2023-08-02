import { any } from "zod";
import path from "path";
import sharp from "sharp";
import prisma from "../../utils/prisma";
import { createCategoryInput } from "./categories.schema";

export async function createCategory(input: createCategoryInput) {
  try {
    return prisma.category.create({
      data: input,
    });
  } catch (error) {
    throw new Error("Error creating category");
  }
}

export async function getCategories() {
  const allCategories = await prisma.category.findMany();
  return allCategories;
}

export async function getCategoriesWithProductCount() {
  const allCategories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  const categoriesWithCount = allCategories.map((category) => ({
    ...category,
    productCount: getProductCount(category.id, allCategories),
    parent: getParentName(category.parent_id, allCategories),
  }));

  return categoriesWithCount;
}
function getParentName(parentId: number | null, allCategories: any[]) {
  const category = allCategories.find((c) => c.id === parentId);
  if (!category) return "--No Parent--";
  return category.name;
}

async function getProductCount(categoryId: number, allCategories: any[]) {
  let count = 0;
  const category = allCategories.find((c) => c.id === categoryId);
  if (!category) return 0;

  count += category.products.length;

  const children = allCategories.filter((c) => c.parent_id === categoryId);
  for (const child of children) {
    count += await getProductCount(child.id, allCategories);
  }

  return count;
}

const getCategoryTree = async () => {
  const categories = await prisma.category.findMany();

  const categoriesMap = new Map();

  categories.forEach((category) => {
    categoriesMap.set(category.id, { ...category, children: [] });
  });
  // console.log("MAP: ", categoriesMap);
  const rootCategories: any[] = [];

  categories.forEach((category) => {
    if (!category.parent_id) {
      rootCategories.push(categoriesMap.get(category.id));
    } else {
      categoriesMap
        .get(category.parent_id)
        .children.push(categoriesMap.get(category.id));
    }
  });

  // console.log("ROOT: ", rootCategories);
  return rootCategories;
};

export default getCategoryTree;

export async function deleteCategory(categoryId: number) {
  try {
    // Check if the category exists in the database
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return null;
    }

    // Delete the category and any associated products (if needed)
    await prisma.category.delete({ where: { id: categoryId } });

    // You may also need to delete associated products if required
    await prisma.product.deleteMany({ where: { category_id: categoryId } });

    return category;
  } catch (error) {
    throw new Error("Error deleting category");
  }
}
