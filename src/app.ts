import fastify, { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import userRoute from "./modules/users/users.routes";
import { userSchemas } from "./modules/users/users.schema";
import productRoutes from "./modules/products/products.routes";
import { productSchemas } from "./modules/products/products.schema";
import { cateogrySchemas } from "./modules/Categories/categories.schema";
import categoriesRoutes from "./modules/Categories/categories.routes";

const PORT = 3000;

export const app = fastify();

app.get("/healthCheck", async () => {
  return { message: "Hello, Vartur.com" };
});

const start = async () => {
  for (const schema of [
    ...userSchemas,
    ...productSchemas,
    ...cateogrySchemas,
  ]) {
    app.addSchema(schema);
  }

  app.register(userRoute, { prefix: "api/users" });
  app.register(productRoutes, { prefix: "api/products" });
  app.register(categoriesRoutes, { prefix: "api/categories" });

  try {
    await app.listen(PORT, "0.0.0.0");
    console.log("Server started on port 3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
