"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("./users.controller");
const users_schema_1 = require("./users.schema");
function userRoute(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/", {
            schema: {
                body: (0, users_schema_1.$ref)("createUserSchema"),
                response: { 201: (0, users_schema_1.$ref)("createUserResponseSchema") },
            },
        }, users_controller_1.registerUserHandler);
        server.post("/login", users_controller_1.loginHandler);
        server.get("/api/env", (request, reply) => {
            reply.send({
                url: process.env.API_URL,
            });
        });
    });
}
exports.default = userRoute;
