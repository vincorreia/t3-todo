import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToastAtom } from "../../hooks/atoms";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  Body?: React.ReactElement;
  Footer?: React.ReactElement;
  hasStaticHeight?: boolean;
};
const Main: React.FC<Props> = ({
  open,
  setOpen,
  Body,
  Footer,
  title,
  hasStaticHeight,
}) => {
  const [clientExists, setClientExists] = useState(false);

  useEffect(() => {
    setClientExists(true);
  }, []);

  if (!open || !clientExists) {
    return null;
  }

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return createPortal(
    <div
      className="absolute top-0 z-[9998] grid h-full w-full items-center justify-center bg-black bg-opacity-20 px-4"
      onClick={handleOpen}
    >
      <div
        className={`flex max-h-[5/6] w-full max-w-[40rem] flex-col gap-y-16 rounded-sm bg-white p-16 ${
          hasStaticHeight ? "h-5/6" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-5xl font-bold  capitalize tracking-tight text-black sm:text-[5rem]">
          {title}
        </h1>
        <div className="flex-grow">
          {Body ? React.cloneElement(Body) : null}
        </div>
        {Footer ? React.cloneElement(Footer) : null}
      </div>
    </div>,
    document.querySelector("body") as HTMLBodyElement
  );
};

type FooterProps = {
  cancelFunc: () => void;
  confirmFunc: () => void;
};
const Footer: React.FC<FooterProps> = ({ confirmFunc, cancelFunc }) => {
  // Todo: Add Icons
  const [{ type }] = useToastAtom();

  const isDisabled = type === "loading";
  return (
    <div className="flex w-full items-center justify-end gap-x-4">
      <button
        className="rounded-md bg-black py-2 px-3 text-white hover:bg-gray-700 active:bg-gray-600"
        onClick={cancelFunc}
        disabled={isDisabled}
      >
        Cancel
      </button>
      <button
        className="rounded-md bg-blue-700 py-2 px-3 text-white hover:bg-blue-600 active:bg-blue-500"
        onClick={confirmFunc}
        disabled={isDisabled}
      >
        Confirm
      </button>
    </div>
  );
};

export const Modal = {
  Main,
  Footer,
};
