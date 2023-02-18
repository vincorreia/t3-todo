import React, { useCallback, useImperativeHandle, useRef } from "react";
import { type z, ZodError } from "zod";
import { inputSchema } from "../../schemas";
import type { InputRef } from "../../types/Ref";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validationSchema?: z.ZodString;
  wrapperClassName?: string;
  handleError?: (error: string | undefined) => void;
}

export const TextField = React.forwardRef<InputRef, Props>(
  (
    {
      label,
      validationSchema = inputSchema,
      wrapperClassName,
      handleError,
      ...props
    },
    ref
  ) => {
    const [error, setError] = React.useState<string | undefined>(undefined);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const validate = useCallback(
      (value: unknown) => {
        let validatedValue: string | undefined;
        try {
          validatedValue = validationSchema.parse(value);
          setError(undefined);
          handleError?.(undefined);
        } catch (error) {
          if (error instanceof ZodError) {
            const errorMessage = error.issues?.[0]?.message;
            setError(errorMessage);
            handleError?.(errorMessage);
          }
        }

        return validatedValue;
      },
      [validationSchema, handleError]
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          validate,
          inputRef,
          wrapperRef,
        };
      },
      [validate]
    );

    return (
      <div
        className={`relative flex flex-grow flex-col gap-y-2 ${
          wrapperClassName ?? ""
        }`}
        ref={wrapperRef}
      >
        {!!label && (
          <label htmlFor={props.id} className="text-sm font-semibold">
            {label}
          </label>
        )}
        <input
          {...props}
          type={props.type ?? "text"}
          className="rounded border border-white p-2 text-black focus:outline-none"
          ref={inputRef}
        />
        {error && (
          <span className="absolute top-[105%] w-full whitespace-nowrap text-sm font-semibold text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
