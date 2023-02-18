import React, { useState } from "react";

type Props = {
  text: string;
  children: React.ReactElement;
};

export const Tooltip: React.FC<Props> = ({ text, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      {open && (
        <span className="absolute bottom-6 whitespace-nowrap rounded-sm bg-black bg-opacity-90 p-1 text-sm font-normal leading-tight">
          {text}
        </span>
      )}
      {React.cloneElement(children, {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      })}
    </div>
  );
};
