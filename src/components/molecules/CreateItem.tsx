import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, type MutableRefObject } from "react";
import { Button } from "../atoms/Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { TextField } from "../atoms/TextField";
import type { InputRef } from "../../types/Ref";
import type { z } from "zod";

type Props = {
  handleCreateTodo: (ref?: MutableRefObject<InputRef | null>) => () => void;
  validationSchema?: z.ZodString;
};
export const CreateItem: React.FC<Props> = ({
  handleCreateTodo,
  validationSchema,
}) => {
  const createItemInput = useRef<InputRef | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <motion.div
      layout="position"
      className="flex w-full flex-col items-center gap-y-4"
    >
      <Button onClick={handleOpen} className="flex w-fit items-center gap-x-2">
        <span>New Item</span>
        <FontAwesomeIcon icon={open ? faArrowDown : faArrowUp} />
      </Button>
      <AnimatePresence presenceAffectsLayout>
        {open && (
          <motion.label
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
                duration: 0.3,
              },
            }}
            layout
            htmlFor="createItem"
            className="flex items-start"
          >
            <TextField
              ref={createItemInput}
              validationSchema={validationSchema}
            />
            <Button
              onClick={handleCreateTodo(createItemInput)}
              className="rounded-r-sm rounded-l-none !border text-white"
            >
              Create
            </Button>
          </motion.label>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
