import { type RefObject, useState } from "react";
import { extrafield } from "../../consts";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { InputRef, TodolistType } from "../../types";
import { api } from "../../utils/api";
import CreateItem from "../molecules/CreateItem";

type Props = {
  itemId: string;
  type: TodolistType;
};

export const CreateTodo: React.FC<Props> = ({ itemId, type }) => {
  const { loadingToast } = useCreateToast();
  const { onSuccess, onError } = useDefaultHandlers({ type: "todo", itemId });
  const [amount, setAmount] = useState(1);

  const createTodo = api.todo.create.useMutation({
    onSuccess,
    onError,
  });

  const handleCreateTodo = async (ref: RefObject<InputRef | null>) => {
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

  const ExtraField = extrafield[type];
  return (
    <CreateItem
      handleCreateTodo={handleCreateTodo}
      ExtraFields={
        ExtraField && (
          <ExtraField name="amount" amount={amount} setAmount={setAmount} notShowError />
        )
      }
    />
  );
};
