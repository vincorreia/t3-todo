import {
  faPenToSquare as edit,
  faTrash as del,
} from "@fortawesome/free-solid-svg-icons";
import { type SetStateAction, useState } from "react";
import { Modal } from "../atoms/Modal";
import { motion } from "framer-motion";
import { ActionButton } from "../atoms/ActionButton";
import { RowLayout } from "../atoms/RowLayout";

type GeneralProps<ItemType> = {
  item: ItemType;
  handleDelete: (item: string) => () => void;
  EditItem: (
    item: ItemType,
    setIsEditing: React.Dispatch<SetStateAction<boolean>>
  ) => React.ReactNode;
  LeftExtraRender?: (item: ItemType) => React.ReactNode;
  RightExtraRender?: (item: ItemType) => React.ReactNode;
};

type Props<ItemType> = GeneralProps<ItemType>;

export const Row = <ItemType extends { id: string; title: string }>({
  handleDelete,
  item,
  EditItem,
  LeftExtraRender,
  RightExtraRender,
}: Props<ItemType>) => {
  const [isEditing, setIsEditing] = useState(false);

  const [open, setOpen] = useState(false);

  const wrapperClasses = [
    "flex flex-col w-full rounded text-md gap-y-2 lg:text-2xl font-medium capitalize",
  ];

  const layoutClasses: string[] = [];

  if (!RightExtraRender) {
    layoutClasses.push("pr-4");
  }

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
        layout="position"
        layoutId={item.id}
        className={wrapperClasses.join(" ")}
      >
        <RowLayout className={layoutClasses.join(" ")}>
          {LeftExtraRender?.(item)}
          <span className="flex-grow py-1">{item.title}</span>

          <span className="flex items-center gap-x-2 text-white">
            <ActionButton
              icon={edit}
              onClick={() => setIsEditing((prev) => !prev)}
            />

            <ActionButton icon={del} onClick={() => setOpen(true)} />
          </span>
          {RightExtraRender?.(item)}
        </RowLayout>

        {isEditing && EditItem(item, setIsEditing)}
      </motion.div>
    </>
  );
};
