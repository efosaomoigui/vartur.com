import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  getCategoryHandler,
  getCategoryTreeHandler,
  getCategoriesWithProductCountHandler,
} from "./categories.controller";
import { $ref } from "./categories.schema";

async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createCategorySchema"),
        response: {
          201: $ref("createCategorySchema"),
        },
      },
    },
    createCategoryHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("categoriesResponseSchema"),
        },
      },
    },

    getCategoryHandler
  );

  server.get("/categoryTree", {}, getCategoryTreeHandler);

  server.get(
    "/categoryWithProductCount",
    {},
    getCategoriesWithProductCountHandler
  );
}

export default categoryRoutes;
