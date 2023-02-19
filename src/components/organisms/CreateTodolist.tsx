import { type MutableRefObject, useState } from "react";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { InputRef, TodolistType } from "../../types";
import { api } from "../../utils/api";
import { TypeSelector } from "../atoms/TypeSelector";
import CreateItem from "../molecules/CreateItem";

export const CreateTodolist: React.FC = () => {
  const { onError, onSuccess } = useDefaultHandlers({ type: "todolist" });
  const { loadingToast } = useCreateToast();
  const [type, setType] = useState<TodolistType>("TODO");
  const todolistsMutation = api.todolists.create.useMutation({
    onSuccess,
    onError,
  });
  const handleCreateTodo =
    (createTodoInput?: MutableRefObject<InputRef | null>) => async () => {
      const input = createTodoInput?.current?.inputRef.current;
      const parsedValue = createTodoInput?.current?.validate(input?.value);

      if (input && parsedValue) {
        loadingToast("Creating...");
        const response = await todolistsMutation.mutateAsync({
          title: parsedValue,
          type,
        });
        if (response) {
          input.value = "";
        }
      }
    };

  return (
    <CreateItem
      handleCreateTodo={handleCreateTodo}
      ExtraFields={<TypeSelector type={type} setType={setType} />}
    />
  );
};
