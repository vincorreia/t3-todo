import { type MutableRefObject, useRef } from "react";
import { Button } from "../atoms/Button";

type Props = {
  handleCreateTodo: (
    ref: MutableRefObject<HTMLInputElement | null>
  ) => () => void;
};
export const CreateItem: React.FC<Props> = ({ handleCreateTodo }) => {
  const createItemInput = useRef<HTMLInputElement | null>(null);
  return (
    <label htmlFor="createItem" className="flex items-center">
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
    </label>
  );
};
