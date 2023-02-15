import {
  faCartShopping,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { TodolistType } from "../../types/Todolist";
import { ActionButton } from "./ActionButton";
import { Tooltip } from "./Tooltip";

type Props = {
  type: TodolistType;
  handleChangeType: (newType: TodolistType) => () => void;
};

export const TypeSelector: React.FC<Props> = ({ type, handleChangeType }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-sm font-semibold">Type</p>
      <div className="flex flex-grow items-center gap-x-2">
        <Tooltip text="Regular todolist">
          <ActionButton
            icon={faFileCircleCheck}
            active={type === "TODO"}
            onClick={handleChangeType("TODO")}
          />
        </Tooltip>
        <Tooltip text="Shopping list">
          <ActionButton
            icon={faCartShopping}
            active={type === "SHOPPING_TODO"}
            onClick={handleChangeType("SHOPPING_TODO")}
          />
        </Tooltip>
      </div>
    </div>
  );
};
