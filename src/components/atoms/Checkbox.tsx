import { cloneElement } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
};

type CheckMarkProps = {
  children: React.ReactElement<{ className: string }>;
  checked: boolean;
};
const CheckMark = ({ children, checked }: CheckMarkProps) => {
  return cloneElement(children, {
    className: `${
      checked ? "after:opacity-100" : "after:border-transparent after:opacity-0"
    } after:border-2 after:border-white after:absolute after:top-[6px] after:left-[5px] after:h-2 after:w-4 after:border-t-0 after:border-r-0 after:rotate-[-45deg]  ${
      children.props.className
    }`,
  });
};

export const Checkbox: React.FC<Props> = ({ className, ...props }) => {
  return (
    <CheckMark checked={props.checked}>
      <label
        htmlFor={props.id}
        className={`relative h-7 w-7 cursor-pointer rounded-full border-2 border-[#ccc] ${
          className ?? ""
        } ${props.checked ? "bg-blue-500" : ""}`}
      >
        <input {...props} className="invisible" type="checkbox" />
      </label>
    </CheckMark>
  );
};
