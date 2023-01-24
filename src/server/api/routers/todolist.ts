import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const todolistRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todolist.findMany();
  }),
  createTodolist: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTodolist = await ctx.prisma.todolist.create({
        data: {
          title: input.title,
        },
      });

      return newTodolist;
    }),
  deleteTodolist: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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

      return {
        status: 404,
      };
    }),
  editTodolist: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input: { id, title }, ctx }) => {
      const response = await ctx.prisma.todolist.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });

      if (response) {
        return {
          status: 200,
          content: response,
        };
      }

      return {
        status: 404,
      };
    }),
  getTodolist: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      if (!input) {
        return {
          status: 400,
        };
      }

      const todolist = await ctx.prisma.todolist.findUnique({
        where: {
          id: input,
        },
      });

      if (todolist) {
        return {
          status: 200,
          content: todolist,
        };
      }

      return {
        status: 404,
      };
    }),
});
