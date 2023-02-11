export const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-x-2 text-3xl">
      <span className="flex h-fit items-end gap-x-1">
        Loading
        <Dot delay="animate-jumping" />
        <Dot delay="animate-jumping1" />
        <Dot delay="animate-jumping2" />
      </span>
    </div>
  );
};

type DotProps = {
  delay: string;
};
const Dot: React.FC<DotProps> = ({ delay }) => {
  const classes = ["h-2 w-2 rounded-full bg-white"];

  classes.push(delay);
  return <span className={classes.join(" ")}></span>;
};
