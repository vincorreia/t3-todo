import { ICONS, PRIMARY_BUTTON_ACTION_CLASSES } from "../../consts";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import { api } from "../../utils/api";
import { ActionButton } from "./ActionButton";
import { Tag } from "./Tag";

type Props = {
  amount: number | null;
  id: string;
  todoListId: string;
};

export const AmountTag: React.FC<Props> = ({ amount, id, todoListId }) => {
  const { onSuccess, onError } = useDefaultHandlers({
    type: "todo",
    itemId: todoListId,
    showDone: false,
  });
  const mutation = api.todo.increaseOrDecrease.useMutation({
    onSuccess,
    onError,
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
