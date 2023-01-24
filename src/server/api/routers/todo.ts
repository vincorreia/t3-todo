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
});
