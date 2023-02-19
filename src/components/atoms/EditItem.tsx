import { useRef } from "react";
import { ICONS } from "../../consts";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import type { InputRef } from "../../types";
import type { Todolist } from "@prisma/client";

type Props = {
  item: Todolist;
  confirmEdit: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  ExtraField?: React.ReactNode;
};
export const EditItem = ({
  item,
  confirmEdit,
  setIsEditing,
  ExtraField,
}: Props) => {
  const textFieldRef = useRef<InputRef | null>(null);
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex w-full items-center gap-x-4 p-2">
      {ExtraField}
      <TextField
        label="Name"
        ref={textFieldRef}
        defaultValue={item.title}
        wrapperClassName="flex-grow min-w-0"
      />
      <ActionButton
        onClick={confirmEdit}
        icon={ICONS.ACCEPT}
        className="pt-5"
      />
      <ActionButton onClick={handleEdit} icon={ICONS.ABORT} className="pt-5" />
    </div>
  );
};
