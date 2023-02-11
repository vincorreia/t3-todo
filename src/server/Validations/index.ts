import { notAuthorizedError, notFoundError } from "../Errors";

export const validateItem = <
  ItemType extends {
    userId: string;
  }
>(
  userId: string,
  item: ItemType | null
) => {
  if (!item) {
    throw notFoundError;
  }

  if (item.userId !== userId) {
    throw notAuthorizedError;
  }
};
