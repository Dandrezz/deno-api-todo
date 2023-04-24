import { Application } from "oak/mod.ts";
import "dotenv/load.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./routes/index.ts";

const app = new Application();

// Middleware
app.use(oakCors()); // Enable CORS for all routes
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = +(Deno.env.get("PORT") || 8000)

console.log(`Server listening on port ${PORT}`);

await app.listen({ port: PORT });