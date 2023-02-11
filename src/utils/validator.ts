export const validateKeyIsBoolean = <DataType extends object>(
  item: DataType,
  key?: keyof DataType
) => {
  if (typeof key === "undefined") {
    return false;
  }

  const value = item[key];

  if (typeof value !== "boolean") {
    throw new Error(`Value of ${String(key)} is not a boolean`);
  }

  return value as boolean;
};
