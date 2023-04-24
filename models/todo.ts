import { ObjectId } from "mongo/mod.ts";
import db from "../db/index.ts";

interface TodoSchema {
  _id: ObjectId;
  name: string;
  status: boolean;
}

const todoCollection = db.collection<TodoSchema>("todo");

export default todoCollection;