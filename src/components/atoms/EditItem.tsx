import { useRef, useState } from "react";
import { ICONS } from "../../consts";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import type { EditTodolistParams, InputRef, TodolistType } from "../../types";
import { TypeSelector } from "./TypeSelector";
import type { Todolist } from "@prisma/client";

type Props = {
  item: Todolist;
  confirmEdit: (params: EditTodolistParams) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditItem = ({ item, confirmEdit, setIsEditing }: Props) => {
  const textFieldRef = useRef<InputRef | null>(null);
  const [type, setType] = useState<TodolistType>(item.type);
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleConfirmEdit = () => {
    const input = textFieldRef.current?.inputRef.current;
    const title = textFieldRef.current?.validate(input?.value);
    if (input && title) {
      confirmEdit({ id: item.id, title, type });
      handleEdit();
    }
  };

  const handleChangeType = (type: TodolistType) => () => {
    setType(type);
  };

  return (
    <div className="flex w-full items-center gap-x-4 p-2">
      <TypeSelector type={type} handleChangeType={handleChangeType} />
      <TextField
        label="Name"
        ref={textFieldRef}
        defaultValue={item.title}
        wrapperClassName="flex-grow min-w-0"
      />
      <ActionButton
        onClick={handleConfirmEdit}
        icon={ICONS.ACCEPT}
        className="pt-5"
      />
      <ActionButton onClick={handleEdit} icon={ICONS.ABORT} className="pt-5" />
    </div>
  );
};
