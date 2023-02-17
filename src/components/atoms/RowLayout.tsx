type Props = {
  children: React.ReactNode;
};

export const RowLayout: React.FC<Props> = ({ children }) => {
  return <div className="flex items-center flex-grow gap-x-4 rounded-l-md border px-2 py-4">{children}</div>;
};
