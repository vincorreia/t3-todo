import React from "react";
import { DISABLED_CLASSES } from "../../consts";

const themes = {
  primary: "bg-blue-700 hover:bg-blue-600 active:bg-blue-500",
  transparent: "border-2 border-white",
  secondary: " bg-black  hover:bg-gray-700 active:bg-gray-600",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  theme?: keyof typeof themes;
};
export const Button: React.FC<Props> = ({
  onClick,
  className,
  type,
  theme = "transparent",
  ...buttonProps
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  const classes = ["rounded-md py-2 px-3 outline-none text-white"];

  classes.push(themes[theme]);

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
