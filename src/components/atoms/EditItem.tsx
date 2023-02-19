import { type RefObject, useRef } from "react";
import { ICONS } from "../../consts";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import type { InputRef } from "../../types";
import {
  useErrorExists,
  withFormValidation,
} from "../molecules/FormValidationContext";

type Props<ItemType> = {
  item: ItemType;
  confirmEdit: (ref: RefObject<InputRef>) => void | Promise<void>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  ExtraField?: React.ReactNode;
};
export const EditItem = withFormValidation(
  <ItemType extends { title: string }>({
    item,
    confirmEdit,
    setIsEditing,
    ExtraField,
  }: Props<ItemType>) => {
    const textFieldRef = useRef<InputRef | null>(null);
    const hasError = useErrorExists();
    const handleEdit = () => {
      setIsEditing((prev) => !prev);
    };

    const handleConfirmEdit = () => {
      !hasError && void confirmEdit(textFieldRef);
    };

    return (
      <div className="flex w-full items-center gap-x-4 p-2">
        {ExtraField}
        <TextField
          label="Name"
          name="Name"
          ref={textFieldRef}
          defaultValue={item.title}
          wrapperClassName="flex-grow min-w-0"
        />
        <ActionButton
          onClick={handleConfirmEdit}
          icon={ICONS.ACCEPT}
          className="pt-5"
        />
        <ActionButton
          onClick={handleEdit}
          icon={ICONS.ABORT}
          className="pt-5"
        />
      </div>
    );
  }
);
