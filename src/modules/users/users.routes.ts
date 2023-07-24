import { FastifyInstance } from "fastify";
import { registerUserHandler, loginHandler } from "./users.controller";
import { $ref } from "./users.schema";

async function userRoute(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: { 201: $ref("createUserResponseSchema") },
      },
    },
    registerUserHandler
  );

  server.post("/login", loginHandler);
}

export default userRoute;
