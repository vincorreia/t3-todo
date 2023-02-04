import { useEffect } from "react";
import ReactDOM from "react-dom";
import { TOAST_INITIAL_VAL } from "../../../consts";
import { useToastAtom } from "../../../hooks/atoms";
import { ErrorToast } from "./ErrorToast";
import { LoadingToast } from "./LoadingToast";
import { SuccessToast } from "./SuccessToast";

const toasts = {
  error: ErrorToast,
  loading: LoadingToast,
  success: SuccessToast,
};

export const Toast = () => {
  const [{ message, type, duration }, setToastAtom] = useToastAtom();

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        console.log("clearing toast");
        setToastAtom(TOAST_INITIAL_VAL);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, setToastAtom]);

  if (!type) {
    return null;
  }

  const ToastComponent = toasts[type];

  return ReactDOM.createPortal(
    <div className="fixed top-0 z-[9999] w-full">
      <ToastComponent message={message} />
    </div>,
    document.body
  );
};
