import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToastAtom } from "../../hooks/atoms";
import { Button } from "./Button";

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
      <Button onClick={cancelFunc} disabled={isDisabled} theme="secondary">
        Cancel
      </Button>
      <Button onClick={confirmFunc} disabled={isDisabled} theme="primary">
        Confirm
      </Button>
    </div>
  );
};

export const Modal = {
  Main,
  Footer,
};
