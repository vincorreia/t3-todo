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
        <span className="absolute bottom-6 bg-black bg-opacity-90 p-1 rounded-sm">
          <span className="whitespace-nowrap text-sm font-normal leading-tight">
            {text}
          </span>
        </span>
      )}
      {React.cloneElement(children, {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      })}
    </div>
  );
};
