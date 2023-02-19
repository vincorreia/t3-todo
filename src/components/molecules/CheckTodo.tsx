import type { Todo } from "@prisma/client";
import { useOptimisticUpdateTodo } from "../../hooks/useOptimisticUpdateTodo";
import { api } from "../../utils/api";
import { Checkbox } from "../atoms/Checkbox";

type Props = {
  id: string;
  done: boolean;
  todoListId: string;
};
export const CheckTodo = ({ id, done, todoListId }: Props) => {
  const mapFunction =
    (input: { id: string; done: boolean }) => (todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: input.done,
        };
      }
      return todo;
    };
  const { onMutate, onSettled, onError } = useOptimisticUpdateTodo(
    todoListId,
    mapFunction
  );
  const mutation = api.todo.check.useMutation({
    onMutate,
    onError,
    onSettled,
  });

  const handleChange = () => {
    mutation.mutate({ id, done: !done });
  };

  return <Checkbox checked={done} onChange={handleChange} id={id} />;
};
