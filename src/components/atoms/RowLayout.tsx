type Props = {
  children: React.ReactNode;
  className?: string;
};

export const RowLayout: React.FC<Props> = ({ children, className }) => {
  const classes = [
    "flex items-center flex-grow gap-x-4 rounded-l-md border rounded-r-lg pl-4 min-h-[4rem]",
  ];

  if (className) {
    classes.push(className);
  }
  return <div className={classes.join(" ")}>{children}</div>;
};
