export type InputRef = {
  validate: (value: unknown) => string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
};
