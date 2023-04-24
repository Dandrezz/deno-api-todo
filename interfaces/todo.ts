import { ObjectId } from "mongo/mod.ts";

export interface Todo {
    _id?: ObjectId
    name: string;
    status: boolean;
}