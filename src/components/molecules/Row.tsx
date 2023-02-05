import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare as access,
  faPenToSquare as edit,
  faTrash as del,
  faCircleXmark as abort,
  faCircleCheck as confirm,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRef, useState } from "react";
import { validateKeyIsBoolean } from "../../utils/validator";
import { Modal } from "../atoms/Modal";
import { Checkbox } from "../atoms/Checkbox";

type GeneralProps<ItemType> = {
  item: ItemType;
  handleDelete: (item: string) => () => void;
  confirmEdit: (id: string, title: string) => void;
};

interface NoCheckboxProps<ItemType> extends GeneralProps<ItemType> {
  isChecked?: undefined;
  handleCheck?: undefined;
}
interface CheckboxProps<ItemType> extends GeneralProps<ItemType> {
  isChecked: keyof ItemType;
  handleCheck: (id: string, check: boolean) => void;
}

type Props<ItemType> = NoCheckboxProps<ItemType> | CheckboxProps<ItemType>;

export const Row = <ItemType extends { id: string; title: string }>({
  handleDelete,
  item,
  confirmEdit,
  isChecked,
  handleCheck,
}: Props<ItemType>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    setError("");
  };

  const handleConfirmEdit = () => {
    const input = inputRef.current;

    if (input && input.value.length > 2) {
      confirmEdit(item.id, input.value);
      handleEdit();
    } else {
      setError("Must have at least 3 characters");
    }
  };
  const [open, setOpen] = useState(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheck?.(item.id, e.target.checked);
  };
  return (
    <>
      <Modal.Main
        open={open}
        setOpen={setOpen}
        title="Delete"
        Body={
          <p className="flex h-full w-full items-center text-xl font-semibold">
            Are you sure you want to delete this item?
          </p>
        }
        Footer={
          <Modal.Footer
            cancelFunc={() => setOpen((prev) => !prev)}
            confirmFunc={handleDelete(item.id)}
          />
        }
      />
      <div className="flex w-full items-center justify-between gap-x-2 rounded border border-white p-4 text-2xl capitalize text-white">
        <span className="flex items-center gap-x-8">
          {isEditing ? null : isChecked !== undefined ? (
            <Checkbox
              checked={validateKeyIsBoolean(item, isChecked)}
              onChange={handleCheckbox}
              id={item.id}
            />
          ) : (
            <Link href={`/${item.id}`}>
              <FontAwesomeIcon icon={access} />
            </Link>
          )}
          {!isEditing && <span className="py-1 px-2">{item.title}</span>}
        </span>
        {!isEditing ? (
          <>
            <span className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={edit}
                onClick={handleEdit}
                className="hover:cursor-pointer"
              />

              <FontAwesomeIcon
                icon={del}
                onClick={() => setOpen(true)}
                className="hover:cursor-pointer"
              />
            </span>
          </>
        ) : (
          <>
            <label htmlFor={item.id} className="flex w-full flex-col gap-y-2">
              <input
                type="text"
                className="w-full h-full rounded-sm py-1 px-2 text-black outline-none"
                ref={inputRef}
                defaultValue={item.title}
                id={item.id}
              />
              {error.length ? (
                <span className="text-red-500">{error}</span>
              ) : null}
            </label>
            <FontAwesomeIcon
              icon={confirm}
              onClick={handleConfirmEdit}
              className="hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={abort}
              onClick={handleEdit}
              className="hover:cursor-pointer"
            />
          </>
        )}
      </div>
    </>
  );
};
