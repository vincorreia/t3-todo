import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { validateItem } from "../../Validations";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todolistRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todolist.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.enum(["TODO", "SHOPPING_TODO"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTodolist = await ctx.prisma.todolist.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          type: input.type,
        },
      });

      return newTodolist;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todoList = await ctx.prisma.todolist.findUnique({
        where: {
          id: input.id,
        },
      });

      validateItem(ctx.session.user.id, todoList);

      await ctx.prisma.todo.deleteMany({
        where: {
          todolistId: input.id,
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.todolist.delete({
        where: {
          id: input.id,
        },
      });

      return {
        status: 200,
      };
    }),
  edit: protectedProcedure
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

      validateItem(ctx.session.user.id, todoList);

      if (type !== todoList?.type && todoList?.todos?.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot change type of todolist with todos",
        });
      }

      if (type === todoList?.type && title === todoList?.title) {
        return todoList;
      }

      return ctx.prisma.todolist.update({
        where: {
          id,
        },
        data: {
          title,
          type,
        },
      });
    }),
  get: protectedProcedure
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
          todos: {
            orderBy: [
              {
                done: "asc",
              },
              {
                title: "asc",
              },
            ],
          },
        },
      });

      validateItem(ctx.session.user.id, todolist);

      return todolist;
    }),
});
