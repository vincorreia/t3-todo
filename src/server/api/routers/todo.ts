import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { validateItem } from "../../Validations";
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
      const todoList = await ctx.prisma.todolist.findUnique({
        where: {
          id: input.todolistId,
        },
      });

      validateItem(ctx.session.user.id, todoList);

      if (todoList?.type === "SHOPPING_TODO" && !input.amount) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Amount is required for shopping todo",
        });
      }

      if (todoList?.type === "TODO" && input.amount) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Amount is not allowed for general todo",
        });
      }

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
          title: input.title,
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
});
