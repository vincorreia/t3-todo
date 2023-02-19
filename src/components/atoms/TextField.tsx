import { Input } from "./Input";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { type z, ZodError } from "zod";
import { inputSchema } from "../../schemas";
import type { InputRef } from "../../types/Ref";
import { Label } from "./Label";
import { InputError } from "./InputError";
import { InputWrapper } from "./InputWrapper";
import { useFormValidation } from "../molecules/FormValidationContext";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  validationSchema?: z.ZodString;
  wrapperClassName?: string;
  notShowError?: boolean;
}

export const TextField = React.forwardRef<InputRef, Props>(
  (
    {
      label,
      validationSchema = inputSchema,
      wrapperClassName,
      name,
      notShowError,
      ...props
    },
    ref
  ) => {
    const { error, setError } = useFormValidation(name);

    const inputRef = useRef<HTMLInputElement>(null);

    const validate = useCallback(
      (value: unknown) => {
        let validatedValue: string | undefined;
        try {
          validatedValue = validationSchema.parse(value);
          setError(undefined);
        } catch (error) {
          if (error instanceof ZodError) {
            const errorMessage = error.issues?.[0]?.message;
            setError(errorMessage);
          }
        }

        return validatedValue;
      },
      [validationSchema, setError]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) {
        validate(e.target.value);
      }
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          validate,
          inputRef,
        };
      },
      [validate]
    );

    return (
      <InputWrapper className={wrapperClassName}>
        {!!label && <Label>{label}</Label>}
        <Input
          {...props}
          type={props.type}
          ref={inputRef}
          onChange={handleChange}
        />
        {!notShowError && error && <InputError>{error}</InputError>}
      </InputWrapper>
    );
  }
);

TextField.displayName = "TextField";
