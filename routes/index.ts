import { Router } from "oak/mod.ts";
import { default as todoRouter } from "./todo.ts"

const router = new Router();

router.use("/todo", todoRouter.routes(),todoRouter.allowedMethods());
export default router;