import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./users.service";
import { CreateUserInput, LoginInput } from "./users.schema";
import { verifyPassword } from "../../utils/hash";
import jwt from "jsonwebtoken";

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  // verify password
  const correctPassword = verifyPassword({
    userPassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;
    // generate access token
    return { accessToken: jwt.sign(rest, "your-secret-key") };
  }

  return reply.code(401).send({
    message: "Invalid email or password",
  });
}
