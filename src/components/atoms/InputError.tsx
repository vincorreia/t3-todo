type Props = {
  children: React.ReactNode;
};

export const InputError: React.FC<Props> = ({ children }) => {
  return (
    <span className="absolute top-[105%] w-full whitespace-nowrap text-sm font-semibold text-red-500">
      {children}
    </span>
  );
};
