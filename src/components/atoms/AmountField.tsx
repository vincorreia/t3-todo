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
};

export const AmountField: React.FC<Props> = ({
  amount,
  setAmount,
  handleError,
  name,
}) => {
  const { error, setError } = useFormValidation(name);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newError = (() => {
      if (e.target.validity.valid) {
        return undefined;
      }
      return "Invalid character";
    })();
    setError(newError);
    handleError?.(newError);

    if (e.target.validity.valid) {
      setAmount(+e.target.value);
    }
  };

  return (
    <InputWrapper className="min-w-0">
      <Label>Amount</Label>
      <Input onChange={onChange} pattern="[0-9]*" value={amount} />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};
