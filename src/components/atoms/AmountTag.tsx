import type { Todo } from "@prisma/client";
import { ICONS, PRIMARY_BUTTON_ACTION_CLASSES } from "../../consts";
import { useOptimisticUpdateTodo } from "../../hooks/useOptimisticUpdateTodo";
import { api } from "../../utils/api";
import { ActionButton } from "./ActionButton";
import { Tag } from "./Tag";

type Props = {
  amount: number | null;
  id: string;
  todoListId: string;
};

export const AmountTag: React.FC<Props> = ({ amount, id, todoListId }) => {
  const mapFunction =
    (input: { id: string; amount: string }) => (todo: Todo) => {
      if (todo.id === id) {
        if (todo.amount === null) {
          throw new Error("Invalid query");
        }
        return {
          ...todo,
          amount: todo.amount + Number(input.amount),
        };
      }
      return todo;
    };
  const { onMutate, onSettled, onError } = useOptimisticUpdateTodo(
    todoListId,
    mapFunction
  );

  const mutation = api.todo.increaseOrDecrease.useMutation({
    onMutate,
    onError,
    onSettled,
  });

  if (!amount) {
    return null;
  }

  const handleIncrease = () => {
    mutation.mutate({ id, amount: "1" });
  };

  const handleDecrease = () => {
    mutation.mutate({ id, amount: "-1" });
  };
  return (
    <Tag type="right">
      <div className="flex items-center gap-x-3 text-xl lg:gap-x-5 lg:text-2xl">
        {amount}
        <div className="flex flex-col items-center">
          <ActionButton
            icon={ICONS.PLUS}
            iconSize="xs"
            className={PRIMARY_BUTTON_ACTION_CLASSES}
            onClick={handleIncrease}
            name="increase"
          />
          <ActionButton
            icon={ICONS.MINUS}
            iconSize="xs"
            className={PRIMARY_BUTTON_ACTION_CLASSES}
            onClick={handleDecrease}
            disabled={amount === 1}
            name="decrease"
          />
        </div>
      </div>
    </Tag>
  );
};
