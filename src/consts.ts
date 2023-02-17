import {
  faArrowDown,
  faArrowUp,
  faArrowUpRightFromSquare,
  faCartShopping,
  faCircleCheck,
  faCircleXmark,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export const TOAST_INITIAL_VAL = {
  message: undefined,
  type: undefined,
  duration: undefined,
};

export const DISABLED_CLASSES = "opacity-50 cursor-not-allowed";

export const ACTIVE_CLASS = "text-[#ff69b4]";

export const ICONS = {
  ARROW_DOWN: faArrowDown,
  ARROW_UP: faArrowUp,
  SHOPPING_TODO: faCartShopping,
  TODO: faFileCircleCheck,
  ABORT: faCircleXmark,
  ACCEPT: faCircleCheck,
  ACCESS: faArrowUpRightFromSquare,
};
