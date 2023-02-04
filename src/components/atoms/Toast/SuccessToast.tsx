import { ToastBody } from "./ToastBody";

type Props = {
  message?: string;
};

export const SuccessToast: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex gap-x-4 bg-green-500 p-4 text-white">
      <ToastBody message={message} type="success" />
    </div>
  );
};
