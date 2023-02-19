type Props = {
  className?: string;
  children: React.ReactNode;
};

export const InputWrapper: React.FC<Props> = ({ className, children }) => {
  const classes = ["relative flex flex-col gap-y-2"];

  if (className) {
    classes.push(className);
  }
  return <div className={classes.join(" ")}>{children}</div>;
};
