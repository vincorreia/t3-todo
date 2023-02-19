import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ type, className, ...props }, ref) => {
    const classes = [
      "rounded border border-white p-2 text-black focus:outline-none",
    ];

    if (className) {
      classes.push(className);
    }
    return (
      <input
        {...props}
        type={type ?? "text"}
        className={classes.join(" ")}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
