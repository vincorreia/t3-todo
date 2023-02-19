import type { Todolist as PrismaTodolist } from "@prisma/client";

export type TodolistType = PrismaTodolist["type"];

export type EditTodolistParams = {
  id: string;
  title: string;
  type: TodolistType;
};
