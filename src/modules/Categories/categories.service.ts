import { any } from "zod";
import prisma from "../../utils/prisma";
import { createCategoryInput } from "./categories.schema";

export async function createCategory(input: createCategoryInput) {
  return prisma.category.create({
    data: input,
  });
}

export function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      picture: true,
      parent_id: true,
      created_at: true,
      updated_at: true,
    },
  });
}

export async function getCategoriesWithProductCount() {
  const allCategories = await prisma.category.findMany();
  const categoriesWithCount = allCategories.map((category) => ({
    ...category,
    productCount: getProductCount(category.id, allCategories),
  }));

  return categoriesWithCount;
}

function getProductCount(categoryId: number, categories: any[]): number {
  let count = 0;
  const children = categories.filter(
    (category) => category.parent_id === categoryId
  );
  count += children.reduce(
    (acc, category) => acc + getProductCount(category.id, categories),
    0
  );
  count += children.length;
  return count;
}

const getCategoryTree = async () => {
  const categories = await prisma.category.findMany();

  const categoriesMap = new Map();

  categories.forEach((category) => {
    categoriesMap.set(category.id, { ...category, children: [] });
  });

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
  console.log("", rootCategories);
  return rootCategories;
};

export default getCategoryTree;
