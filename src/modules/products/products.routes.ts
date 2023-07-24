import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getProductsHandler,
} from "./products.controller";
import { $ref } from "./products.schema";

async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("createProductSchema"),
        },
      },
    },
    createProductHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("createProductSchema"),
        },
      },
    },

    getProductsHandler
  );
}

export default productRoutes;
