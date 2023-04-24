import { Router } from "oak/mod.ts";

import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controllers/todo.ts";

const router = new Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;