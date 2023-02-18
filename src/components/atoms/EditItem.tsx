import { useRef, useState } from "react";
import { ICONS } from "../../consts";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import type { InputRef, TodolistType } from "../../types";
import { TypeSelector } from "./TypeSelector";

type Props<ItemType> = {
  item: ItemType;
  confirmEdit: (id: string, value: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditItem = <ItemType extends { id: string; title: string }>({
  item,
  confirmEdit,
  setIsEditing,
}: Props<ItemType>) => {
  const textFieldRef = useRef<InputRef | null>(null);
  const [type, setType] = useState<TodolistType>("TODO");
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleConfirmEdit = () => {
    const input = textFieldRef.current?.inputRef.current;
    const parsedValue = textFieldRef.current?.validate(input?.value);
    if (input && parsedValue) {
      confirmEdit(item.id, parsedValue);
      handleEdit();
    }
  };

  const handleChangeType = (type: TodolistType) => () => {
    setType(type);
  };

  return (
    <div className="flex w-full items-center gap-x-4 p-2">
      <TypeSelector type={type} handleChangeType={handleChangeType} />
      <TextField label="Name" ref={textFieldRef} defaultValue={item.title} wrapperClassName="flex-grow min-w-0" />
      <ActionButton onClick={handleConfirmEdit} icon={ICONS.ACCEPT} className="pt-5"/>
      <ActionButton onClick={handleEdit} icon={ICONS.ABORT} className="pt-5" />
    </div>
  );
};
