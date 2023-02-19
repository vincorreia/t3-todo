import type { Todo } from "@prisma/client";
import type { RefObject } from "react";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { InputRef } from "../../types";
import { api } from "../../utils/api";
import { EditItem } from "../atoms/EditItem";

type Props = {
  item: Todo;
  todolistId: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditTodo: React.FC<Props> = ({
  item,
  todolistId,
  setIsEditing,
}) => {
  const { loadingToast } = useCreateToast();
  const { onSuccess, onError } = useDefaultHandlers({
    type: "todo",
    itemId: todolistId,
  });

  const editTodo = api.todo.update.useMutation({
    onSuccess,
    onError,
  });
  const handleEdit = (id: string, title: string) => {
    loadingToast("Updating...");
    editTodo.mutate({
      id,
      title,
    });
  };

  const handleConfirmEdit = (ref: RefObject<InputRef>) => () => {
    const input = ref.current?.inputRef.current;
    const parsedInput = ref.current?.validate(input?.value);
    if (input && parsedInput) {
      handleEdit(item.id, parsedInput);
    }
    setIsEditing(false);
  };

  return (
    <EditItem
      item={item}
      confirmEdit={handleConfirmEdit}
      setIsEditing={setIsEditing}
    />
  );
};
