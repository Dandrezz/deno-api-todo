import { type RouterContext } from "oak/mod.ts";
import { todoCollection } from "../models/index.ts";
import { Todo } from "../interfaces/index.ts";
import { ObjectId } from "mongo/mod.ts";

// GET /users
const getTodos = async ({ response }: RouterContext<string>) => {
    response.type = "application/json";
    const todos = await todoCollection.find();

    response.body = await todos.toArray();
};

// GET /users/:id
const getTodoById = async ({ response, params }: RouterContext<string>) => {
    response.type = "application/json";
    const id = params.id;
    const todo = await todoCollection.findOne({
        _id: new ObjectId(id),
    });
    response.body = todo;
};

// POST /users
const createTodo = async ({ request, response }: RouterContext<string>) => {
    response.type = "application/json";
    const data = await request.body().value;
    const newTodo: Todo = {
        name: data.name,
        status: data.status,
    }
    const id = await todoCollection.insertOne(newTodo);
    response.status = 201
    newTodo._id = id;
    response.body = newTodo;
};

// PUT /users/:id
const updateTodo = async ({ request, response, params }: RouterContext<string>) => {
    response.type = "application/json";
    const id = params.id;
    const data = await request.body().value;
    const updatedTodo: Todo = {
        name: data.name,
        status: data.status,
    }
    const { modifiedCount } = await todoCollection.updateOne({ _id: new ObjectId(id), }, { $set: updatedTodo });
    if (!modifiedCount) {
        response.status = 404;
        response.body = { msg: `Cannot find todo with id: ${id}` };
        return
    }

    response.status = 200;
    response.body = updatedTodo;
};

// DELETE /users/:id
const deleteTodo = ({ response, params }: RouterContext<string>) => {
    const id = params.id;
    const deleteTodo = todoCollection.deleteOne({ _id: new ObjectId(id), });
    if (!deleteTodo) {
        response.status = 404;
        response.body = { msg: `Cannot find todo with id: ${id}` };
        return
    }
    response.status = 204;
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
