import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { validateItem, validateTodoAmount } from "../../Validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        todolistId: z.string(),
        amount: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const dbTodolist = await ctx.prisma.todolist.findUnique({
        where: {
          id: input.todolistId,
        },
      });

      const todoList = validateItem(ctx.session.user.id, dbTodolist);

      validateTodoAmount(todoList.type, input.amount);

      const newTodo = await ctx.prisma.todo.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          todolistId: input.todolistId,
          amount: input.amount,
        },
      });

      return newTodo;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.findUnique({
        where: {
          id: input,
        },
      });

      validateItem(ctx.session.user.id, todo);

      await ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });

      return {
        status: 200,
      };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        amount: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const dbTodo = await ctx.prisma.todo.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todolist: {
            select: {
              type: true,
            },
          },
        },
      });

      const todo = validateItem(ctx.session.user.id, dbTodo);

      validateTodoAmount(todo.todolist.type, input.amount);

      const updatedTodo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          amount: input.amount,
        },
      });

      return updatedTodo;
    }),
  check: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });

      validateItem(ctx.session.user.id, todo);

      const updatedTodo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      });

      return updatedTodo;
    }),
  increaseOrDecrease: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.enum(["1", "-1"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const amount = parseInt(input.amount) as 1 | -1;
      const dbTodo = await ctx.prisma.todo.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todolist: {
            select: {
              type: true,
            },
          },
        },
      });

      const todo = validateItem(ctx.session.user.id, dbTodo);

      if (todo.todolist.type === "TODO") {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "You can't increase or decrease a general todo item",
        });
      }

      const todoAmount = todo.amount as number;

      if (todoAmount + amount < 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't decrease a todo item below 1",
        });
      }

      const updatedTodo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      return updatedTodo;
    }),
});
