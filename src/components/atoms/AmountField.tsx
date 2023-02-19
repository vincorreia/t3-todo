import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useFormValidation } from "../molecules/FormValidationContext";
import { Input } from "./Input";
import { InputError } from "./InputError";
import { InputWrapper } from "./InputWrapper";
import { Label } from "./Label";

type Props = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  name: string;
  handleError?: (error: string | undefined) => void;
  className?: string;
  notShowError?: boolean;
};

export const AmountField: React.FC<Props> = ({
  amount,
  setAmount,
  handleError,
  name,
  className,
  notShowError,
}) => {
  const { error, setError } = useFormValidation(name);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newError = (() => {
      const isValid = e.target.validity.valid;
      const isZero = +e.target.value === 0;
      if (isValid && !isZero) {
        return undefined;
      }

      if (isZero) {
        return "Amount cannot be zero";
      }

      return "Invalid character";
    })();
    setError(newError);
    handleError?.(newError);

    if (e.target.validity.valid) {
      setAmount(+e.target.value);
    }
  };
  const wrapperClasses = ["min-w-0"];
  if (className) {
    wrapperClasses.push(className);
  }
  return (
    <InputWrapper className={wrapperClasses.join(" ")}>
      <Label>Amount</Label>
      <Input onChange={onChange} pattern="[0-9]*" value={amount} />
      {!notShowError && error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};
