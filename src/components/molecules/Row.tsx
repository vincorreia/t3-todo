import {
  faPenToSquare as edit,
  faTrash as del,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Modal } from "../atoms/Modal";
import { motion } from "framer-motion";
import { ActionButton } from "../atoms/ActionButton";
import { EditItem } from "../atoms/EditItem";
import { RowLayout } from "../atoms/RowLayout";

type GeneralProps<ItemType> = {
  item: ItemType;
  handleDelete: (item: string) => () => void;
  confirmEdit: (id: string, title: string) => void;
  LeftExtraRender?: (item: ItemType) => React.ReactNode;
  RightExtraRender?: (item: ItemType) => React.ReactNode;
};

type Props<ItemType> = GeneralProps<ItemType>;

export const Row = <ItemType extends { id: string; title: string }>({
  handleDelete,
  item,
  confirmEdit,
  LeftExtraRender,
  RightExtraRender,
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

  const wrapperClasses = [
    "flex w-full items-center rounded text-lg lg:text-2xl font-medium capitalize",
  ];

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
        {isEditing ? (
          <EditItem
            item={item}
            inputRef={inputRef}
            handleConfirmEdit={handleConfirmEdit}
            handleEdit={handleEdit}
            error={error}
          />
        ) : (
          <>
            <RowLayout>
              {/* (
            <Checkbox
              checked={checked}
              onChange={handleCheckbox}
              id={item.id}
              disabled={isDisabled}
            />
          ) : (
            
          ) */}
              {LeftExtraRender?.(item)}
              <span className="flex-grow py-1">{item.title}</span>

              <span className="flex items-center gap-x-2 text-white">
                <ActionButton icon={edit} onClick={handleEdit} />

                <ActionButton icon={del} onClick={() => setOpen(true)} />
              </span>
            </RowLayout>
            {RightExtraRender?.(item)}
          </>
        )}
      </motion.div>
    </>
  );
};
