import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
  findProductHandler,
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
      // schema: {
      //   response: {
      //     200: $ref("productsResponseSchema"),
      //   },
      // },
    },

    getProductsHandler
  );

  server.delete("/:productId", {}, deleteProductHandler);
  server.get("/:productId", {}, findProductHandler);
}

export default productRoutes;
