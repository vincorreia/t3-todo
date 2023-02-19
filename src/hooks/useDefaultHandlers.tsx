import { api } from "../utils/api";
import { useCreateToast } from "./atoms";

type ParamsTodolist = {
  type: "todolist";
  itemId?: never;
};

type ParamsTodo = {
  type: "todo";
  itemId: string;
};

type Params = (ParamsTodolist | ParamsTodo) & { showDone?: boolean };

export const useDefaultHandlers = ({
  type,
  itemId,
  showDone = true,
}: Params) => {
  const { successToast, errorToast } = useCreateToast();
  const apiContext = api.useContext();

  const onSuccess = async () => {
    if (type === "todolist") {
      await apiContext.todolists.getAll.invalidate();
    }

    if (type === "todo") {
      await apiContext.todolists.get.invalidate(itemId);
    }

    showDone && successToast("The data has been successfully updated!");
  };

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };

  return {
    onSuccess,
    onError,
  };
};
