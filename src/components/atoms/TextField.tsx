import React, { useImperativeHandle, useRef } from "react";
import { type z, ZodError } from "zod";
import { inputSchema } from "../../schemas";
import type { InputRef } from "../../types/Ref";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validationSchema?: z.ZodString;
}

export const TextField = React.forwardRef<InputRef, Props>(
  ({ label, validationSchema = inputSchema, ...props }, ref) => {
    const [error, setError] = React.useState<string | undefined>(undefined);

    const inputRef = useRef<HTMLInputElement>(null);

    const validate = (value: unknown) => {
      let validatedValue: string | undefined;
      try {
        validatedValue = validationSchema.parse(value);
        setError(undefined);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(error.issues?.[0]?.message);
        }
      }

      return validatedValue;
    };

    useImperativeHandle(ref, () => {
      return {
        validate,
        inputRef,
      };
    });

    return (
      <div className="flex flex-col gap-y-2">
        {!!label && (
          <label htmlFor={props.id} className="text-sm font-semibold">
            {label}
          </label>
        )}
        <input
          {...props}
          type={props.type ?? "text"}
          className="rounded-l-sm border border-white p-2 text-black focus:outline-none"
          ref={inputRef}
        />
        {error && (
          <span className="text-sm font-semibold text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
