import { cloneElement } from "react";
import { DISABLED_CLASSES } from "../../consts";

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
  const classes = [
    "relative h-7 w-7 cursor-pointer rounded-full border-2 border-[#ccc]",
  ];

  if (className) {
    classes.push(className);
  }

  if (props.checked) {
    classes.push("bg-blue-500");
  }

  if (props.disabled) {
    classes.push(DISABLED_CLASSES);
  }

  return (
    <CheckMark checked={props.checked}>
      <label htmlFor={props.id} className={classes.join(" ")}>
        <input {...props} className="invisible" type="checkbox" />
      </label>
    </CheckMark>
  );
};
