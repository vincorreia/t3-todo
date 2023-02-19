type Props = React.HTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<Props> = ({ className, children, ...props }) => {
  const classes = ["text-sm font-semibold"];

  if (className) {
    classes.push(className);
  }

  return (
    <label {...props} className={classes.join(" ")}>
      {children}
    </label>
  );
};
