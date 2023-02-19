import { ICONS, PRIMARY_BUTTON_ACTION_CLASSES } from "../../consts";
import { useCreateToast } from "../../hooks/atoms";
import { api } from "../../utils/api";
import { ActionButton } from "./ActionButton";
import { Tag } from "./Tag";

type Props = {
  amount: number | null;
  id: string;
  todoListId: string;
};

export const AmountTag: React.FC<Props> = ({ amount, id, todoListId }) => {
  const apiContext = api.useContext();
  const { errorToast } = useCreateToast();
  const mutation = api.todo.increaseOrDecrease.useMutation({
    async onMutate(input) {
      await apiContext.todolists.get.cancel(todoListId);

      const previousValue = apiContext.todolists.get.getData(todoListId);

      if (!previousValue) {
        throw new Error("Invalid query");
      }

      const newValue = previousValue.todos.map((todo) => {
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
      });

      apiContext.todolists.get.setData(todoListId, {
        ...previousValue,
        todos: newValue,
      });

      return { previousValue };
    },
    onError(error, __input, context) {
      apiContext.todolists.get.setData(todoListId, context?.previousValue);
      errorToast(error.message);
    },
    onSettled() {
      void apiContext.todolists.get.invalidate(todoListId);
    },
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
