import Head from "next/head";
import { useRouter } from "next/router";
import type { MutableRefObject } from "react";
import { CreateItem } from "../../components/molecules/CreateItem";
import { Row } from "../../components/molecules/Row";
import { useCreateToast } from "../../hooks/atoms";
import { api } from "../../utils/api";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query;
  const { successToast, errorToast, loadingToast } = useCreateToast();

  if (typeof itemId !== "string") {
    return null;
  }

  const item = api.todolists.getTodolist.useQuery(itemId);

  const apiContext = api.useContext();

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };

  const onSuccess = async () => {
    await apiContext.todolists.getTodolist.invalidate(itemId);
    successToast("The data has been successfully updated!");
  };
  const createTodo = api.todo.createTodo.useMutation({
    onSuccess,
    onError,
  });

  const deleteTodo = api.todo.deleteTodo.useMutation({
    onSuccess,
    onError,
  });

  const editTodo = api.todo.updateTodo.useMutation({
    onSuccess,
    onError,
  });

  const checkTodo = api.todo.checkTodo.useMutation({
    onSuccess,
    onError,
  });

  const handleDelete = (id: string) => () => {
    loadingToast("Deleting...");
    deleteTodo.mutate(id);
  };

  const handleCheck = (id: string, done: boolean) => {
    loadingToast("Updating...");
    checkTodo.mutate({
      id,
      done,
    });
  };

  const handleCreateTodo = (ref: MutableRefObject<HTMLInputElement | null>) => {
    return async () => {
      loadingToast("Creating...");
      const input = ref.current;
      if (input) {
        const response = await createTodo.mutateAsync({
          title: input.value,
          todolistId: itemId,
        });

        if (response) {
          input.value = "";
        }
      }
    };
  };

  const handleEdit = (id: string, title: string) => {
    loadingToast("Updating...");
    editTodo.mutate({
      id,
      title,
    });
  };

  return (
    <>
      <Head>
        <title>{item.data?.content?.title ?? itemId}</title>
      </Head>
      <h1 className="text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[5rem]">
        {item.data?.content?.title ?? itemId}
      </h1>
      <CreateItem handleCreateTodo={handleCreateTodo} />
      {item.data?.content?.todos?.map((todo) => (
        <Row
          key={todo.id}
          item={todo}
          handleDelete={handleDelete}
          confirmEdit={handleEdit}
          isChecked="done"
          handleCheck={handleCheck}
        />
      ))}
    </>
  );
};

export default ItemPage;
