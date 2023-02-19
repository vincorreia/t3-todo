import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type RefObject, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { TextField } from "../atoms/TextField";
import type { InputRef } from "../../types/Ref";
import type { z } from "zod";
import { useToastAtom } from "../../hooks/atoms";
import { ICONS } from "../../consts";
import {
  useClearErrors,
  useErrorExists,
  withFormValidation,
} from "./FormValidationContext";
import { FormErrors } from "../atoms/FormErrors";

type Props = {
  handleCreateTodo: (ref: RefObject<InputRef | null>) => void | Promise<void>;
  validationSchema?: z.ZodString;
  ExtraFields?: React.ReactElement;
};

const initialClasses = ["flex h-full gap-x-4"];
const CreateItem = ({
  handleCreateTodo,
  validationSchema,
  ExtraFields,
}: Props) => {
  const createItemInput = useRef<InputRef | null>(null);
  const hasError = useErrorExists();
  const clearErrors = useClearErrors();

  const [open, setOpen] = useState(false);

  const classes = [...initialClasses];

  const handleOpen = () => {
    setOpen((prev) => !prev);
    clearErrors();
  };

  const [{ type: toastType }] = useToastAtom();

  const handleClickCreate = () => {
    !hasError && void handleCreateTodo(createItemInput);
  };

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
                name="Name"
                ref={createItemInput}
                validationSchema={validationSchema}
                label="Name"
                wrapperClassName="flex-grow"
                notShowError
              />
              {ExtraFields}
            </span>
            <FormErrors />
            <Button
              onClick={handleClickCreate}
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

export default withFormValidation(CreateItem);
