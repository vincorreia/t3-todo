import Link from "next/link";
import { useRef, useState } from "react";
import { validateKeyIsBoolean } from "../../utils/validator";
import { Button } from "../atoms/Button";
import { Modal } from "../atoms/Modal";

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
      <div className="flex w-1/2 items-center justify-between rounded border border-white p-4 text-2xl capitalize text-white">
        <span className="flex items-center gap-x-8">
          {isEditing ? null : isChecked !== undefined ? (
            <input
              type="checkbox"
              checked={validateKeyIsBoolean(item, isChecked)}
              className="cursor-pointer"
              onChange={handleCheckbox}
            />
          ) : (
            <Link href={`/${item.id}`}>Access</Link>
          )}
          {!isEditing && item.title}
        </span>
        {!isEditing ? (
          <>
            <span className="flex gap-x-4">
              <Button onClick={handleEdit} className="rounded-sm">
                Edit
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="rounded-sm"
              >
                Delete
              </Button>
            </span>
          </>
        ) : (
          <>
            <label htmlFor={item.id} className="flex w-full flex-col gap-y-2">
              <input
                type="text"
                className="h-full text-black"
                ref={inputRef}
                defaultValue={item.title}
                id={item.id}
              />
              {error.length ? (
                <span className="text-red-500">{error}</span>
              ) : null}
            </label>
            <Button onClick={handleConfirmEdit}>Confirm</Button>
            <Button onClick={handleEdit}>Abort</Button>
          </>
        )}
      </div>
    </>
  );
};
