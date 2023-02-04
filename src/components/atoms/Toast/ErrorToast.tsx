import { ToastBody } from "./ToastBody";

type Props = {
  message?: string;
};

export const ErrorToast: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex gap-x-4 bg-red-500 p-4 text-white">
      <ToastBody message={message} type="error" />
    </div>
  );
};
