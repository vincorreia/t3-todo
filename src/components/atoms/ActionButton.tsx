import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ACTIVE_CLASS, DISABLED_CLASSES } from "../../consts";
import { useToastAtom } from "../../hooks/atoms";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
  active?: boolean;
}

export const ActionButton: React.FC<Props> = ({
  icon,
  disabled,
  type,
  active,
  ...props
}) => {
  const [{ type: toastType }] = useToastAtom();
  const isDisabled = disabled || toastType === "loading";

  const classes = [props.className];

  if (isDisabled) {
    classes.push(DISABLED_CLASSES);
  }

  if (active) {
    classes.push(ACTIVE_CLASS);
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
