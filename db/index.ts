import { MongoClient } from "mongo/mod.ts";
import "dotenv/load.ts";

const HOST = Deno.env.get("MONGO_HOST") || "localhost";
const PORT = +(Deno.env.get("MONGO_PORT") || 27017);
const USER = Deno.env.get("MONGO_USER") || "";
const PASSWORD = Deno.env.get("MONGO_PASSWORD") || "";
const MONGO_DB = Deno.env.get("MONGO_DB") || "todo";

const client = new MongoClient();
// Connecting to a Mongo Atlas Database
await client.connect({
    db: MONGO_DB,
    tls: true,
    servers: [
        {
            host: HOST,
            port: PORT,
        },
    ],
    credential: {
        username: USER,
        password: PASSWORD,
        db: MONGO_DB,
        mechanism: "SCRAM-SHA-1",
    },
});

// Connecting to a Local Database
const db = client.database("todo");

export default db;