import { FastifyRequest } from "fastify";
import { IncomingMessage } from "http";
import { JwtPayload } from "jsonwebtoken"; // Import the JwtPayload type from the 'jsonwebtoken' package

declare module "fastify" {
  interface FastifyRequest<
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    RawServer extends RawServerDefault = RawServerDefault,
    RawRequest extends IncomingMessage = IncomingMessage,
    FastifySchema = FastifySchema,
    FastifyType = FastifyTypeProviderDefault,
    ContextConfig = unknown,
    Logger = FastifyBaseLogger
  > {
    // jwtVerify(): Promise<JwtPayload>; // Define the 'jwtVerify' method with the appropriate return type
  }
}
