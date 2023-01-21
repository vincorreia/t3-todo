import { useRef, useState } from "react";
import { Button } from "../atoms/Button";

type Props<ItemType> = {
  item: ItemType;
  handleDelete: (id: string) => () => void;
  confirmEdit: (id: string) => (title: string) => void;
};

export const Row = <ItemType extends { id: string; title: string }>({
  handleDelete,
  item,
  confirmEdit,
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
    <div
      className="flex items-center gap-x-4 text-2xl text-white"
      key={item.id}
    >
      {!isEditing ? (
        <>
          <span>{item.title}</span>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete(item.id)}>Delete</Button>
        </>
      ) : (
        <>
          <label htmlFor={item.id} className="flex flex-col gap-y-2">
            <input
              type="text"
              className="h-full text-black"
              ref={inputRef}
              defaultValue={item.title}
            />
            {error.length ? (
              <span className=" text-red-500">{error}</span>
            ) : null}
          </label>
          <Button onClick={handleConfirmEdit}>Confirm</Button>
          <Button onClick={handleEdit}>Abort</Button>
        </>
      )}
    </div>
  );
};
