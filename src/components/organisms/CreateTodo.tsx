import { type RefObject, useState } from "react";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { InputRef, TodolistType } from "../../types";
import { api } from "../../utils/api";
import { AmountField } from "../atoms/AmountField";
import CreateItem from "../molecules/CreateItem";

type Props = {
  itemId: string;
  type: TodolistType;
};

const extrafield = {
  SHOPPING_TODO: AmountField,
  TODO: undefined,
} as Record<TodolistType, undefined | typeof AmountField>;

export const CreateTodo: React.FC<Props> = ({ itemId, type }) => {
  const { loadingToast } = useCreateToast();
  const { onSuccess, onError } = useDefaultHandlers({ type: "todo", itemId });
  const [amount, setAmount] = useState(1);

  const createTodo = api.todo.create.useMutation({
    onSuccess,
    onError,
  });

  const handleCreateTodo = (ref?: RefObject<InputRef | null>) => {
    return async () => {
      const input = ref?.current?.inputRef.current;

      const parsedInput = ref?.current?.validate(input?.value);

      if (input && parsedInput) {
        loadingToast("Creating...");
        const response = await createTodo.mutateAsync({
          title: parsedInput,
          todolistId: itemId,
          amount: type === "SHOPPING_TODO" ? amount : undefined,
        });
        if (response) {
          input.value = "";
        }
      }
    };
  };

  const ExtraField = extrafield[type];
  return (
    <CreateItem
      handleCreateTodo={handleCreateTodo}
      ExtraFields={
        ExtraField && (
          <ExtraField name="amount" amount={amount} setAmount={setAmount} />
        )
      }
    />
  );
};
