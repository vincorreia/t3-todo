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
});
