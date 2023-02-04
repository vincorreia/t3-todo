import { useEffect } from "react";
import ReactDOM from "react-dom";
import { TOAST_INITIAL_VAL } from "../../../consts";
import { useToastAtom } from "../../../hooks/atoms";
import { ToastBody } from "./ToastBody";

export const Toast = () => {
  const [{ message, type, duration }, setToastAtom] = useToastAtom();

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setToastAtom(TOAST_INITIAL_VAL);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, setToastAtom]);

  if (!type) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 z-[9999] w-full">
      <ToastBody message={message} type={type} />
    </div>,
    document.body
  );
};
