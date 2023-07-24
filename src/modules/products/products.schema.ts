import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  category_id: z.number(),
};

const productGenerated = {
  created_at: z.date(),
  updated_at: z.date(),
};

const createProductSchema = z.object({
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
