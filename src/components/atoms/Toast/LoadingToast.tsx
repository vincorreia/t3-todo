import { ToastBody } from "./ToastBody";

type Props = {
  message?: string;
};

export const LoadingToast: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex gap-x-4 bg-blue-500 p-4 text-white">
      <ToastBody message={message} type="loading" />
    </div>
  );
};
