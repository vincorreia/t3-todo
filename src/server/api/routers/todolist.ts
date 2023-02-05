import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const notFoundError = new TRPCError({
  code: "NOT_FOUND",
  message: "Todolist not found",
});

export const todolistRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todolist.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.enum(["TODO", "SHOPPING_TODO"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTodolist = await ctx.prisma.todolist.create({
        data: {
          title: input.title,
          type: input.type,
        },
      });

      return newTodolist;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.todo.deleteMany({
        where: {
          todolistId: input.id,
        },
      });

      const deleteResponse = await ctx.prisma.todolist.delete({
        where: {
          id: input.id,
        },
      });

      if (deleteResponse) {
        return {
          status: 200,
        };
      }

      throw notFoundError;
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        type: z.enum(["TODO", "SHOPPING_TODO"]).optional(),
      })
    )
    .mutation(async ({ input: { id, title, type }, ctx }) => {
      const todoList = await ctx.prisma.todolist.findUnique({
        where: {
          id,
        },
        include: {
          todos: true,
        },
      });

      if (type && todoList?.todos.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot change type of todolist with todos",
        });
      }

      const response = await ctx.prisma.todolist.update({
        where: {
          id,
        },
        data: {
          title,
          type: todoList?.todos.length ? todoList.type : type,
        },
      });

      if (response) {
        return {
          status: 200,
          content: response,
        };
      }

      throw notFoundError;
    }),
  get: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      if (!input) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing id",
        });
      }

      const todolist = await ctx.prisma.todolist.findUnique({
        where: {
          id: input,
        },
        include: {
          todos: true,
        },
      });

      if (todolist) {
        return {
          status: 200,
          content: todolist,
        };
      }

      throw notFoundError;
    }),
});
