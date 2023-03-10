import type {
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ACTIVE_CLASS, DISABLED_CLASSES } from "../../consts";
import { useToastAtom } from "../../hooks/atoms";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
  active?: boolean;
  iconSize?: SizeProp;
}

export const ActionButton: React.FC<Props> = ({
  icon,
  iconSize = "1x",
  disabled,
  type,
  active,
  className,
  ...props
}) => {
  const [{ type: toastType }] = useToastAtom();
  const isDisabled = disabled || toastType === "loading";

  const classes = [];

  if (className) {
    classes.push(className);
  }

  if (isDisabled) {
    classes.push(
      DISABLED_CLASSES,
      "text-gray-600 hover:text-gray-600 active:text-gray-600"
    );
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
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </button>
  );
};
