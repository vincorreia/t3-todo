import { Row } from "../molecules/Row";

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
    <div className="flex h-full w-full flex-grow flex-col gap-y-8 overflow-y-auto px-4">
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
    </div>
  );
};
