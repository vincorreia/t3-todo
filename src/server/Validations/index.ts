import { TRPCError } from "@trpc/server";
import type { TodolistType } from "../../types";
import { notAuthorizedError, notFoundError } from "../Errors";

export const validateItem = <
  ItemType extends {
    userId: string;
  }
>(
  userId: string,
  item: ItemType | null
) => {
  if (!item) {
    throw notFoundError;
  }

  if (item.userId !== userId) {
    throw notAuthorizedError;
  }

  return item;
};

export const validateTodoAmount = (type: TodolistType, amount?: number) => {
  if (type === "SHOPPING_TODO" && !amount) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Amount is required for shopping todo",
    });
  }

  if (type === "TODO" && amount) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Amount is not allowed for general todo",
    });
  }
};
