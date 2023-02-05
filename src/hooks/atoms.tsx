import { atom, useAtom } from "jotai";
import { TOAST_INITIAL_VAL } from "../consts";

type ToastAtomI = {
  message: string | undefined;
  type: "error" | "loading" | "success" | undefined;
  duration: number | undefined;
};

const toastAtom = atom<ToastAtomI>(TOAST_INITIAL_VAL);

export const useToastAtom = () => {
  return useAtom(toastAtom);
};

export const useCreateToast = () => {
  const [, setToastAtom] = useToastAtom();

  const successToast = (message: string, duration?: number) => {
    setToastAtom({ message, type: "success", duration: duration ?? 5000 });
  };

  const errorToast = (message: string, duration?: number) => {
    setToastAtom({ message, type: "error", duration: duration ?? 5000 });
  };

  const loadingToast = (message: string, duration?: number) => {
    setToastAtom({ message, type: "loading", duration: duration ?? 0 });
  };
  return {
    successToast,
    errorToast,
    loadingToast,
  };
};
