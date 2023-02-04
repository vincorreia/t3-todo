import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { TOAST_INITIAL_VAL } from "../../../consts";
import { useToastAtom } from "../../../hooks/atoms";
import { ToastBody } from "./ToastBody";

export const Toast = () => {
  const [{ message, type, duration }, setToastAtom] = useToastAtom();
  const [clientExists, setClientExists] = useState(false);

  useEffect(() => {
    setClientExists(true);
  }, []);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setToastAtom(TOAST_INITIAL_VAL);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, setToastAtom]);

  if (!clientExists) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {type ? (
        <motion.div
          animate={{ translateY: "100%" }}
          exit={{ translateY: "-100%" }}
          className="fixed bottom-full z-[9999] w-full"
        >
          <ToastBody message={message} type={type} />
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};
