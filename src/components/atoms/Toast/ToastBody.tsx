import { TOAST_INITIAL_VAL } from "../../../consts";
import { useToastAtom } from "../../../hooks/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faX,
  faSpinner,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "./ProgressBar";
import { ActionButton } from "../ActionButton";

const icon = {
  success: faCircleCheck,
  error: faExclamationCircle,
  loading: faSpinner,
};

const colors = {
  success: "bg-green-500",
  error: "bg-red-500",
  loading: "bg-blue-500",
};

type Props = {
  type: keyof typeof icon;
  message?: string;
};

export const ToastBody: React.FC<Props> = ({ type, message }) => {
  const [, setToastAtom] = useToastAtom();

  const handleClose = () => {
    setToastAtom(TOAST_INITIAL_VAL);
  };
  return (
    <>
      <div
        className={`flex items-center gap-x-8 px-8 py-4 text-white ${colors[type]}`}
      >
        <FontAwesomeIcon
          icon={icon[type]}
          spin={type === "loading"}
          size="3x"
        />
        <div className="flex flex-col gap-y-4">
          <p className="text-2xl font-bold capitalize">{type}</p>
          <p className="text-xl font-semibold">{message}</p>
        </div>
        <div className="flex flex-grow items-end justify-end self-start">
          <ActionButton onClick={handleClose} className="w-4" icon={faX} />
        </div>
      </div>
      {type !== "loading" && <ProgressBar />}
    </>
  );
};
