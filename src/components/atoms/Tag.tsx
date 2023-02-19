const typeClasses = {
  left: "rounded-l-md",
  right: "rounded-r-md",
};

type Props = {
  children: React.ReactNode;
  type?: keyof typeof typeClasses;
};
export const Tag: React.FC<Props> = ({ children, type = "left" }) => {
  const classes = [
    "flex h-full items-center justify-center bg-white px-4 text-[var(--primary)]",
  ];

  classes.push(typeClasses[type]);

  return <div className={classes.join(" ")}>{children}</div>;
};
