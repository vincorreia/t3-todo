import { Row } from "../molecules/Row";
import { AnimatePresence, motion } from "framer-motion";

type GeneralProps<ItemType> = {
  items: ItemType[];
  functions: {
    handleDelete: (item: string) => () => void;
    confirmEdit: (id: string, title: string) => void;
    handleCheck?: (id: string, check: boolean) => void;
  };
};

type CheckboxTableProps<ItemType> = GeneralProps<ItemType> & {
  isChecked: keyof ItemType & string;
  functions: {
    handleCheck: (id: string, check: boolean) => void;
    confirmEdit: (id: string, title: string) => void;
    handleDelete: (item: string) => () => void;
  };
};

type NoCheckboxTableProps<ItemType> = GeneralProps<ItemType> & {
  isChecked?: undefined;
  functions: {
    handleCheck?: undefined;
    confirmEdit: (id: string, title: string) => void;
    handleDelete: (item: string) => () => void;
  };
};

type Props<ItemType> =
  | CheckboxTableProps<ItemType>
  | NoCheckboxTableProps<ItemType>;

export const Table = <ItemType extends { id: string; title: string }>({
  items,
  isChecked,
  functions: { handleDelete, confirmEdit, handleCheck },
}: Props<ItemType>) => {
  return (
    <motion.div
      transition={{ duration: 0.5, y: { stiffness: 1000 } }}
      layout
      layoutId="table"
      className="flex h-full w-full flex-grow flex-col gap-y-8 overflow-y-auto px-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          if (isChecked && handleCheck) {
            return (
              <Row
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                confirmEdit={confirmEdit}
                isChecked={isChecked}
                handleCheck={handleCheck}
              />
            );
          }
          return (
            <Row
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              confirmEdit={confirmEdit}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
