// src/app.ts
import fastify from "fastify";
const PORT = 3000;

const app = fastify();

app.get("/", async () => {
  return { message: "Hello, Fastify!" };
});

const start = async () => {
  try {
    await app.listen(PORT, "0.0.0.0");
    console.log("Server started on port 3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
