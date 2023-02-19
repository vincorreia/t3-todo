import {
  faArrowDown,
  faArrowUp,
  faArrowUpRightFromSquare,
  faCartShopping,
  faCheck,
  faFileCircleCheck,
  faMinusCircle,
  faPlusCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { AmountField } from "./components/atoms/AmountField";
import type { TodolistType } from "./types";

export const TOAST_INITIAL_VAL = {
  message: undefined,
  type: undefined,
  duration: undefined,
};

export const DISABLED_CLASSES = "opacity-50 cursor-not-allowed";

export const ACTIVE_CLASS = "text-[#ff69b4]";

export const PRIMARY_BUTTON_ACTION_CLASSES =
  "hover:text-[#3C0A8E] active:text-[#4A03AE]";

export const ICONS = {
  ARROW_DOWN: faArrowDown,
  ARROW_UP: faArrowUp,
  SHOPPING_TODO: faCartShopping,
  TODO: faFileCircleCheck,
  ABORT: faX,
  ACCEPT: faCheck,
  ACCESS: faArrowUpRightFromSquare,
  PLUS: faPlusCircle,
  MINUS: faMinusCircle,
};

export const extrafield = {
  SHOPPING_TODO: AmountField,
  TODO: undefined,
} as Record<TodolistType, undefined | typeof AmountField>;
