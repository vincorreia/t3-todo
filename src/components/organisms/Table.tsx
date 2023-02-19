import { Row } from "../molecules/Row";
import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

type GeneralProps<ItemType> = {
  items: ItemType[];
  functions: {
    handleDelete: (item: string) => () => void;
  };
  EditItem: (
    item: ItemType,
    setIsEditing: Dispatch<SetStateAction<boolean>>
  ) => React.ReactNode;
  LeftExtraRender?: (item: ItemType) => React.ReactNode;
  RightExtraRender?: (item: ItemType) => React.ReactNode;
};

type Props<ItemType> = GeneralProps<ItemType>;

export const Table = <ItemType extends { id: string; title: string }>({
  items,
  functions: { handleDelete },
  LeftExtraRender,
  RightExtraRender,
  EditItem,
}: Props<ItemType>) => {
  return (
    <motion.div
      transition={{ duration: 0.25 }}
      layout
      layoutId="table"
      className="flex h-full w-full flex-grow flex-col gap-y-8 overflow-y-auto px-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          return (
            <Row
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              LeftExtraRender={LeftExtraRender}
              RightExtraRender={RightExtraRender}
              EditItem={EditItem}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
