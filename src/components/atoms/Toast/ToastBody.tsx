type Props = {
  type: string;
  message?: string;
};

export const ToastBody: React.FC<Props> = ({ type, message }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold capitalize">{type}</p>
      <p className="text-xl font-semibold">{message}</p>
    </div>
  );
};
