import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, type MutableRefObject } from "react";
import { Button } from "../atoms/Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { TextField } from "../atoms/TextField";
import type { InputRef } from "../../types/Ref";
import type { z } from "zod";
import { useToastAtom } from "../../hooks/atoms";
import { ICONS } from "../../consts";

type Props = {
  handleCreateTodo: (ref?: MutableRefObject<InputRef | null>) => () => void;
  validationSchema?: z.ZodString;
  ExtraFields?: React.ReactElement;
};

const initialClasses = ["flex h-full gap-x-4"];
export const CreateItem: React.FC<Props> = ({
  handleCreateTodo,
  validationSchema,
  ExtraFields,
}) => {
  const createItemInput = useRef<InputRef | null>(null);

  const [open, setOpen] = useState(false);

  const [classes, setClasses] = useState(initialClasses);
  const handleOpen = () => {
    setOpen((prev) => !prev);
    setClasses((prev) => {
      if (!open) {
        return prev.filter((className) => className !== "pb-5");
      }

      return prev;
    });
  };

  const handleError = (error: string | undefined) => {
    if (error) {
      setClasses((prev) => [...prev, "pb-5"]);
    } else {
      setClasses((prev) => prev.filter((className) => className !== "pb-5"));
    }
  };

  const [{ type: toastType }] = useToastAtom();

  return (
    <motion.div
      layout="position"
      className="flex w-full flex-col items-center gap-y-4"
    >
      <Button onClick={handleOpen} className="flex w-fit items-center gap-x-2">
        <span>New Item</span>
        <FontAwesomeIcon icon={open ? ICONS.ARROW_DOWN : ICONS.ARROW_UP} />
      </Button>
      <AnimatePresence presenceAffectsLayout>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: "-100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-10%",
              transition: {
                duration: 0.2,
              },
            }}
            layout
            className="flex w-full max-w-[18rem] flex-col gap-y-2"
          >
            <span className={classes.join(" ")}>
              <TextField
                ref={createItemInput}
                validationSchema={validationSchema}
                label="Name"
                handleError={handleError}
              />
              {ExtraFields}
            </span>
            <Button
              onClick={handleCreateTodo(createItemInput)}
              disabled={toastType === "loading"}
            >
              Create
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
