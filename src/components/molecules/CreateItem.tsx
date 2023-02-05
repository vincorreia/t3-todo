import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { type MutableRefObject, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

type Props = {
  handleCreateTodo: (
    ref: MutableRefObject<HTMLInputElement | null>
  ) => () => void;
};
export const CreateItem: React.FC<Props> = ({ handleCreateTodo }) => {
  const createItemInput = useRef<HTMLInputElement | null>(null);

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
            className="flex items-center"
          >
            <input
              type="text"
              ref={createItemInput}
              className="rounded-l-sm border border-white p-2 text-black focus:outline-none"
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
