import Head from "next/head";
import { useRouter } from "next/router";
import type { MutableRefObject } from "react";
import { CreateItem } from "../../components/molecules/CreateItem";
import { Row } from "../../components/molecules/Row";
import { api } from "../../utils/api";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query;

  if (typeof itemId !== "string") {
    return null;
  }

  const item = api.todolists.getTodolist.useQuery(itemId);

  const apiContext = api.useContext();

  const onSuccess = async () => {
    await apiContext.todolists.getTodolist.invalidate(itemId);
  };
  const createTodo = api.todo.createTodo.useMutation({
    onSuccess,
  });

  const deleteTodo = api.todo.deleteTodo.useMutation({
    onSuccess,
  });

  const editTodo = api.todo.updateTodo.useMutation({
    onSuccess,
  });

  const checkTodo = api.todo.checkTodo.useMutation({
    onSuccess,
  });

  const handleDelete = (id: string) => () => {
    deleteTodo.mutate(id);
  };

  const handleCheck = (id: string, done: boolean) => {
    checkTodo.mutate({
      id,
      done,
    });
  };

  const handleCreateTodo = (ref: MutableRefObject<HTMLInputElement | null>) => {
    return async () => {
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
