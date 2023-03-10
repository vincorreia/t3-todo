import { ICONS } from "../../consts";
import type { TodolistType } from "../../types/Todolist";
import { ActionButton } from "./ActionButton";
import { Tooltip } from "./Tooltip";

type Props = {
  type: TodolistType;
  setType: (newType: TodolistType) => void;
};

export const TypeSelector: React.FC<Props> = ({ type, setType }) => {
  const handleChangeType = (newType: TodolistType) => () => {
    setType(newType);
  };
  return (
    <div className="flex h-full w-fit flex-col gap-y-2">
      <p className="text-sm font-semibold">Type</p>
      <div className="flex flex-grow items-center gap-x-2">
        <Tooltip text="Regular todolist">
          <ActionButton
            icon={ICONS.TODO}
            active={type === "TODO"}
            onClick={handleChangeType("TODO")}
          />
        </Tooltip>
        <Tooltip text="Shopping list">
          <ActionButton
            icon={ICONS.SHOPPING_TODO}
            active={type === "SHOPPING_TODO"}
            onClick={handleChangeType("SHOPPING_TODO")}
          />
        </Tooltip>
      </div>
    </div>
  );
};
