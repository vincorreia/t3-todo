import type { Todolist } from "@prisma/client";

export type TodolistType = NonNullable<Todolist["type"]>;
