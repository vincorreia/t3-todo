import React from "react";
import { DISABLED_CLASSES } from "../../consts";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};
export const Button: React.FC<Props> = ({
  onClick,
  className,
  type,
  ...buttonProps
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  const classes = ["rounded-md border-2 border-white px-4 py-2 outline-none"];

  if (className) {
    classes.push(className);
  }

  if (buttonProps.disabled) {
    classes.push(DISABLED_CLASSES);
  }

  return (
    <button
      {...buttonProps}
      onClick={handleClick}
      type={type ?? "button"}
      className={classes.join(" ")}
    >
      {buttonProps.children}
    </button>
  );
};
