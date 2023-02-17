import { ICONS } from "../../consts";
import { ActionButton } from "./ActionButton";
import { RowLayout } from "./RowLayout";

type Props<ItemType> = {
  item: ItemType;
  inputRef: React.RefObject<HTMLInputElement>;
  handleConfirmEdit: () => void;
  handleEdit: () => void;
  error: string;
};
export const EditItem = <ItemType extends { id: string; title: string }>({
  item,
  inputRef,
  handleConfirmEdit,
  handleEdit,
  error,
}: Props<ItemType>) => {
  return (
    <RowLayout>
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
          <ActionButton onClick={handleConfirmEdit} icon={ICONS.ACCEPT} />
          <ActionButton onClick={handleEdit} icon={ICONS.ABORT} />
        </div>
        {error.length ? (
          <span className="basis-full text-sm text-red-500">{error}</span>
        ) : null}
      </div>
    </RowLayout>
  );
};
