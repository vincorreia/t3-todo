import type { Todo } from "@prisma/client";
import { type RefObject, useState } from "react";
import { extrafield } from "../../consts";
import { useCreateToast } from "../../hooks/atoms";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import type { InputRef, TodolistType } from "../../types";
import { api } from "../../utils/api";
import { EditItem } from "../atoms/EditItem";

type Props = {
  todolistId: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  item: Todo;
  type: TodolistType;
};

export const EditTodo: React.FC<Props> = ({
  item,
  todolistId,
  setIsEditing,
  type,
}) => {
  const [amount, setAmount] = useState(item.amount ?? 0);
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
      amount: amount || undefined,
    });
  };

  const handleConfirmEdit = (ref: RefObject<InputRef>) => {
    const input = ref.current?.inputRef.current;
    const parsedInput = ref.current?.validate(input?.value);
    if (input && parsedInput) {
      handleEdit(item.id, parsedInput);
      setIsEditing(false);
    }
  };

  const ExtraField = extrafield[type];
  return (
    <EditItem
      item={item}
      confirmEdit={handleConfirmEdit}
      setIsEditing={setIsEditing}
      ExtraField={
        ExtraField && (
          <span className="w-14">
            <ExtraField amount={amount} setAmount={setAmount} name="amount" />
          </span>
        )
      }
    />
  );
};
