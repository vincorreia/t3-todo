import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        todolistId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTodo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
          todolistId: input.todolistId,
        },
      });

      return newTodo;
    }),
  deleteTodo: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const deletedTodo = await ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });

      return deletedTodo;
    }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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
  checkTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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
