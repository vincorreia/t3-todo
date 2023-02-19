import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "../../consts";
import { useFormErrors } from "../molecules/FormValidationContext";

export const FormErrors = () => {
  const errors = useFormErrors();

  if (!errors.length) {
    return null;
  }

  return (
    <>
      {errors.map((error) => (
        <span
          className="flex w-full items-center gap-x-2 whitespace-nowrap text-sm font-semibold text-red-500"
          key={error[0]}
        >
          <FontAwesomeIcon icon={ICONS.ERROR} size="sm" />
          {error[1]}
        </span>
      ))}
    </>
  );
};
