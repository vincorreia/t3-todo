import Head from "next/head";
import { useRouter } from "next/router";
import type { MutableRefObject } from "react";
import { CreateItem } from "../../components/molecules/CreateItem";
import { api } from "../../utils/api";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query;

  if (typeof itemId !== "string") {
    return null;
  }
  const item = api.todolists.getTodolist.useQuery(itemId);

  const apiContext = api.useContext();

  const createTodo = api.todo.createTodo.useMutation({
    onSuccess: async () => {
      await apiContext.todolists.getTodolist.invalidate(itemId);
    },
  });

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

  return (
    <>
      <Head>
        <title>{item.data?.content?.title ?? itemId}</title>
      </Head>
      <h1 className="text-5xl">{item.data?.content?.title ?? itemId}</h1>
      <CreateItem handleCreateTodo={handleCreateTodo} />
      {item.data?.content?.todos?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  );
};

export default ItemPage;
