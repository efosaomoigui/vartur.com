import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryInput = {
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  parent_id: z.number(),
};

const cateogryGenerated = {
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

const categoriesResponseSchema = z.array(CategoryResponseSchema);

export type createCategoryInput = z.infer<typeof createCategorySchema>;

export const { schemas: cateogrySchemas, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    CategoryResponseSchema,
    categoriesResponseSchema,
  },
  { $id: "categorySchemas" }
);
