import { api } from "../utils/api";
import { useCreateToast } from "./atoms";

export const useDefaultHandlers = (type: "todolist" | "todo") => {
  const { successToast, errorToast } = useCreateToast();
  const apiContext = api.useContext();

  const onSuccess = async () => {
    if (type === "todolist") {
      await apiContext.todolists.getAll.invalidate();
    }

    if (type === "todo") {
    }

    successToast("The data has been successfully updated!");
  };

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };

  return {
    onSuccess,
    onError,
  };
};
