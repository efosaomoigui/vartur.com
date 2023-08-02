import prisma from "../../utils/prisma";
import { CreateProductInput } from "./products.schema";

export async function createProduct(input: CreateProductInput) {
  try {
    return prisma.product.create({
      data: input,
    });
  } catch (error) {
    throw new Error("Error creating product");
  }
}

export async function getProducts() {
  const allCategories = await prisma.category.findMany({
    select: { name: true, id: true },
  });

  const allProducts = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const productsWithCount = allProducts.map((product) => ({
    ...product,
    categoryName: getCategoryName(product.category_id, allCategories),
  }));

  return productsWithCount;
}

function getCategoryName(categoryId: number, allCategories: any[]) {
  const category = allCategories.find((c) => c.id === categoryId);
  if (!category) return "--No Category--";
  return category.name;
}

export async function deleteProduct(productId: number) {
  try {
    // Check if the product exists in the database
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return null;
    }

    await prisma.product.delete({ where: { id: productId } });

    return product;
  } catch (error) {
    throw new Error("Error deleting category");
  }
}

export async function findProduct(categoryId: number) {
  try {
    const allCategories = await prisma.category.findMany({
      select: { name: true, id: true },
    });

    const allProducts = await prisma.product.findMany({
      where: { category_id: categoryId },
      include: {
        category: true,
      },
    });

    const productsWithCount = allProducts.map((product) => ({
      ...product,
      categoryName: getCategoryName(product.category_id, allCategories),
    }));

    return productsWithCount;
  } catch (error) {
    throw new Error("Error finding product");
  }
}
