import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCreateToast } from "../../hooks/atoms";
import { api } from "../../utils/api";
import { faArrowLeftLong as faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table } from "../../components/organisms/Table";
import { LayoutGroup } from "framer-motion";
import { Loading } from "../../components/atoms/Loading";
import { useDefaultHandlers } from "../../hooks/useDefaultHandlers";
import { CreateTodo } from "../../components/organisms/CreateTodo";
import { EditTodo } from "../../components/molecules/EditTodo";
import { AmountTag } from "../../components/atoms/AmountTag";
import type { Todo } from "@prisma/client";
import { CheckTodo } from "../../components/molecules/CheckTodo";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query as { itemId: string };
  const { loadingToast } = useCreateToast();
  const { onSuccess, onError } = useDefaultHandlers({ type: "todo", itemId });

  const todoList = api.todolists.get.useQuery(itemId, { onError });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess,
    onError,
  });

  const handleDelete = (id: string) => () => {
    loadingToast("Deleting...");
    deleteTodo.mutate(id);
  };

  if (todoList.isLoading || !todoList.data) {
    return (
      <>
        <Head>
          <title>Loading item...</title>
        </Head>
        <Loading />
      </>
    );
  }

  const getRightExtraRender =
    todoList.data.type === "SHOPPING_TODO"
      ? (todo: Todo) => (
          <AmountTag todoListId={itemId} id={todo.id} amount={todo.amount} />
        )
      : undefined;

  return (
    <>
      <Head>
        <title>{todoList.data.title}</title>
      </Head>
      <span className="w-full h-fit relative flex items-center justify-center">
        <Link href="/" className="absolute left-8">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <h1 className="text-center text-title font-extrabold capitalize tracking-tight text-white">
          {todoList.data.title}
        </h1>
      </span>
      <LayoutGroup>
        <CreateTodo itemId={itemId} type={todoList.data.type} />
        <Table
          items={todoList.data.todos}
          functions={{
            handleDelete,
          }}
          LeftExtraRender={(todo) => (
            <CheckTodo id={todo.id} done={todo.done} todoListId={itemId} />
          )}
          RightExtraRender={getRightExtraRender}
          EditItem={(item, setIsEditing) => (
            <EditTodo
              item={item}
              setIsEditing={setIsEditing}
              todolistId={itemId}
              type={todoList.data?.type ?? "TODO"}
            />
          )}
        />
      </LayoutGroup>
    </>
  );
};

export default ItemPage;
