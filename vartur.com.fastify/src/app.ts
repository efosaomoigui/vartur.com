import fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import userRoute from "./modules/users/users.routes";
import { userSchemas } from "./modules/users/users.schema";
import productRoutes from "./modules/products/products.routes";
import { productSchemas } from "./modules/products/products.schema";
import { cateogrySchemas } from "./modules/Categories/categories.schema";
import categoriesRoutes from "./modules/Categories/categories.routes";

const PORT = 3000;

export const app = fastify();
app.register(cors, {
  origin: true,
});

app.register(require("fastify-multipart"), {
  addToBody: true,
});

app.register(require("@fastify/swagger"), {});
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/vartur/docs",
  info: {
    title: "Test swagger",
    description: "Testing the Fastify swagger API",
    version: "0.1.0",
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: () => void
    ) {
      next();
    },
    preHandler: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: () => void
    ) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
  transformSpecification: (
    swaggerObject: {
      info: { title: string; description: string; version: string };
    },
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    let version = "1.0.0";
    swaggerObject.info = {
      title: "Vartur.com",
      description: `Vartur.com API documentation for version ${version}`,
      version: `${version}`,
    };
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

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
