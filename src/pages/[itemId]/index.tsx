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
      <div className="w-4/12">
        {item.data?.content?.todos?.map((todo) => (
          <Row
            key={todo.id}
            item={todo}
            handleDelete={(item) => () => {
              console.log("delete", item);
            }}
            confirmEdit={() => (title) => {
              console.log("edit", todo.id, title);
            }}
            isChecked="done"
          />
        ))}
      </div>
    </>
  );
};

export default ItemPage;
