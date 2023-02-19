import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCreateToast, useToastAtom } from "../../hooks/atoms";
import { api } from "../../utils/api";
import { faArrowLeftLong as faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table } from "../../components/organisms/Table";
import { LayoutGroup } from "framer-motion";
import { Loading } from "../../components/atoms/Loading";
import { type GetServerSideProps } from "next";
import { getSSGHelpers } from "../../utils/ssg";
import { Checkbox } from "../../components/atoms/Checkbox";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import { CreateTodo } from "../../components/organisms/CreateTodo";
import { EditTodo } from "../../components/molecules/EditTodo";

export const getServerSideProps: GetServerSideProps<{
  itemId: string;
}> = async (context) => {
  const ssg = await getSSGHelpers(context.req, context.res);
  const itemId = context.params?.itemId as string;

  await ssg.todolists.get.prefetch(itemId);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      itemId,
    },
  };
};

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query as { itemId: string };
  const { loadingToast } = useCreateToast();
  const { onSuccess, onError } = useDefaultHandlers({ type: "todo", itemId });
  const [{ type: toastType }] = useToastAtom();

  const item = api.todolists.get.useQuery(itemId, { onError });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess,
    onError,
  });

  const checkTodo = api.todo.check.useMutation({
    onSuccess,
    onError,
  });

  const handleDelete = (id: string) => () => {
    loadingToast("Deleting...");
    deleteTodo.mutate(id);
  };

  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      loadingToast("Updating...");
      checkTodo.mutate({
        id,
        done: e.target.checked,
      });
    };

  if (item.isLoading || !item.data) {
    return (
      <>
        <Head>
          <title>Loading item...</title>
        </Head>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{item.data.title}</title>
      </Head>
      <Link href="/" className="absolute top-[5%] left-[10%]">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <h1 className="text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[5rem]">
        {item.data.title}
      </h1>
      <LayoutGroup>
        <CreateTodo itemId={itemId} type={item.data.type} />
        <Table
          items={item.data.todos}
          functions={{
            handleDelete,
          }}
          LeftExtraRender={(todo) => (
            <Checkbox
              checked={todo.done}
              onChange={handleCheck(todo.id)}
              id={todo.id}
              disabled={toastType === "loading"}
            />
          )}
          EditItem={(item, setIsEditing) => (
            <EditTodo
              item={item}
              setIsEditing={setIsEditing}
              todolistId={itemId}
            />
          )}
        />
      </LayoutGroup>
    </>
  );
};

export default ItemPage;
