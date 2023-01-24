import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "../atoms/Button";

type Props<ItemType> = {
  item: ItemType;
  handleDelete: (id: string) => () => void;
  confirmEdit: (id: string) => (title: string) => void;
  isChecked?: keyof ItemType;
};

export const Row = <ItemType extends { id: string; title: string }>({
  handleDelete,
  item,
  confirmEdit,
  isChecked,
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
      confirmEdit(item.id)(input.value);
      handleEdit();
    } else {
      setError("Must have at least 3 characters");
    }
  };

  return (
    <div className="flex w-full items-center gap-x-4 text-2xl text-white justify-between">
      {isEditing ? null : isChecked !== undefined ? (
        <input checked={item[isChecked] as boolean} />
      ) : (
        <Link href={`/${item.id}`}>Access</Link>
      )}
      {!isEditing ? (
        <>
          <span>{item.title}</span>
          <Button onClick={handleEdit} className="rounded-sm">
            Edit
          </Button>
          <Button onClick={handleDelete(item.id)} className="rounded-sm">
            Delete
          </Button>
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
  );
};
