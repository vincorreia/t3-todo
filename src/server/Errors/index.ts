import { TRPCError } from "@trpc/server";

export const notFoundError = new TRPCError({
  code: "NOT_FOUND",
  message: "Todolist not found",
});

export const notAuthorizedError = new TRPCError({
    code: "UNAUTHORIZED",
    message: "You are not authorized to interact with this todolist",
  });