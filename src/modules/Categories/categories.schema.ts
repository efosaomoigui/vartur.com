import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryInput = {
  name: z.string(),
  picture: z.string(),
  parent_id: z.number(),
  file: z.any(),
};

const cateogryGenerated = {
  id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
};

const createCategorySchema = z.object({
  ...categoryInput,
});

const CategoryResponseSchema = z.object({
  ...categoryInput,
  ...cateogryGenerated,
});

export const categoriesResponseSchema = z.array(CategoryResponseSchema);

const categoriesWithChildrenResponseSchema = z.object({
  ...categoryInput,
  children: categoriesResponseSchema,
  ...cateogryGenerated,
});

export type createCategoryInput = z.infer<typeof createCategorySchema>;

export const { schemas: cateogrySchemas, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    CategoryResponseSchema,
    categoriesResponseSchema,
    categoriesWithChildrenResponseSchema,
  },
  { $id: "categorySchemas" }
);
