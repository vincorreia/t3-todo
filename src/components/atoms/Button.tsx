import React from "react";

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

  return (
    <button
      {...buttonProps}
      onClick={handleClick}
      type={type ?? "button"}
      className={`border border-white p-2 ${className ?? ""}`}
    >
      {buttonProps.children}
    </button>
  );
};
