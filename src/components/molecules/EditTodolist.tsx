import type { Todolist } from "@prisma/client";
import { type RefObject, useState } from "react";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { EditTodolistParams, InputRef } from "../../types";
import { api } from "../../utils/api";
import { EditItem } from "../atoms/EditItem";
import { TypeSelector } from "../atoms/TypeSelector";

type Props = {
  item: Todolist;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditTodolist: React.FC<Props> = ({ item, setIsEditing }) => {
  const { onSuccess, onError } = useDefaultHandlers({ type: "todolist" });

  const [type, setType] = useState(item.type);

  const { loadingToast } = useCreateToast();

  const editTodo = api.todolists.edit.useMutation({
    onSuccess,
    onError,
  });

  const confirmEdit = ({ id, title, type }: EditTodolistParams) => {
    loadingToast("Editing...");
    editTodo.mutate({
      id,
      title,
      type,
    });
  };

  const handleConfirmEdit = (ref: RefObject<InputRef>) => {
    const input = ref.current?.inputRef.current;
    const title = ref.current?.validate(input?.value);
    if (input && title) {
      confirmEdit({ id: item.id, title, type });
      setIsEditing(false);
    }
  };
  return (
    <EditItem
      item={item}
      confirmEdit={handleConfirmEdit}
      setIsEditing={setIsEditing}
      ExtraField={<TypeSelector type={type} setType={setType} />}
    />
  );
};
