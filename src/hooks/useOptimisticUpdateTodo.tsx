import type { Todo } from "@prisma/client";
import { api } from "../utils/api";
import { useCreateToast } from "./atoms";

export const useOptimisticUpdateTodo = <T extends { id: string }>(
  todoListId: string,
  mapFunction: (input: T) => (item: Todo) => Todo
) => {
  const { errorToast } = useCreateToast();
  const apiContext = api.useContext();
  const onMutate = async (input: T) => {
    await apiContext.todolists.get.cancel(todoListId);

    const previousValue = apiContext.todolists.get.getData(todoListId);

    if (!previousValue) {
      throw new Error("Invalid query");
    }

    const newValue = previousValue.todos.map(mapFunction(input));

    apiContext.todolists.get.setData(todoListId, {
      ...previousValue,
      todos: newValue,
    });

    return { previousValue };
  };

  const onSettled = () => {
    void apiContext.todolists.get.invalidate(todoListId);
  };

  const onError = <U extends { message: string }>(
    error: U,
    __input: T,
    context?: Awaited<ReturnType<typeof onMutate>>
  ) => {
    apiContext.todolists.get.setData(todoListId, context?.previousValue);
    errorToast(error.message);
  };

  return { onMutate, onSettled, onError };
};
