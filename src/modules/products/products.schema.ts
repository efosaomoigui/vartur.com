import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  name: z.string(),
  picture: z.string(),
  category_id: z.number(),
  file: z.any(),
};

const productGenerated = {
  id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
};

export const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
  },
  { $id: "productSchemas" }
);
