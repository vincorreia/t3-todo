import type { Todolist } from "@prisma/client";
import { useRef, useState } from "react";
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
  const textFieldRef = useRef<InputRef | null>(null);
  const { onSuccess, onError } = useDefaultHandlers("todolist");

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

  const handleConfirmEdit = () => {
    const input = textFieldRef.current?.inputRef.current;
    const title = textFieldRef.current?.validate(input?.value);
    if (input && title) {
      confirmEdit({ id: item.id, title, type: item.type });
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
