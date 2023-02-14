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
import { motion } from "framer-motion";
import { useToastAtom } from "../../hooks/atoms";
import { ActionButton } from "../atoms/ActionButton";

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

const styles = {
  true: "border-gray-400 text-gray-400",
  false: "border-white text-white",
};

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

  const [{ type }] = useToastAtom();
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

  const checked = validateKeyIsBoolean(item, isChecked);

  const wrapperClasses = [
    "flex w-full items-center gap-x-2 rounded border p-4 text-2xl capitalize",
    styles[checked.toString() as keyof typeof styles],
  ];

  const isDisabled = type === "loading";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        layoutId={item.id}
        className={wrapperClasses.join(" ")}
      >
        <span className="flex items-center gap-x-8">
          {isEditing ? null : isChecked !== undefined ? (
            <Checkbox
              checked={checked}
              onChange={handleCheckbox}
              id={item.id}
              disabled={isDisabled}
            />
          ) : (
            <Link href={`/${item.id}`}>
              <FontAwesomeIcon icon={access} />
            </Link>
          )}
        </span>
        {!isEditing && (
          <span className="flex-grow py-1 px-2">{item.title}</span>
        )}
        {!isEditing ? (
          <>
            <span className="flex items-center gap-x-4 text-white">
              <ActionButton icon={edit} onClick={handleEdit} />

              <ActionButton icon={del} onClick={() => setOpen(true)} />
            </span>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col text-white">
              <div className="flex w-full items-center justify-between gap-x-2">
                <label htmlFor={item.id} className="w-full">
                  <input
                    type="text"
                    className="h-full w-full rounded-sm py-1 px-2 text-black outline-none"
                    ref={inputRef}
                    defaultValue={item.title}
                    id={item.id}
                  />
                </label>
                <ActionButton onClick={handleConfirmEdit} icon={confirm} />
                <ActionButton onClick={handleEdit} icon={abort} />
              </div>
              {error.length ? (
                <span className="basis-full text-sm text-red-500">{error}</span>
              ) : null}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};
