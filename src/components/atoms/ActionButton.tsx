import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DISABLED_CLASSES } from "../../consts";
import { useToastAtom } from "../../hooks/atoms";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
}

export const ActionButton: React.FC<Props> = ({
  icon,
  disabled,
  type,
  ...props
}) => {
  const [{ type: toastType }] = useToastAtom();
  const isDisabled = disabled || toastType === "loading";

  const classes = [props.className];

  if (isDisabled) {
    classes.push(DISABLED_CLASSES);
  }

  return (
    <button
      className={classes.join(" ")}
      type={type ?? "button"}
      disabled={isDisabled}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
