import { LayoutGroup } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { Table } from "../components/organisms/Table";
import { useCreateToast } from "../hooks/atoms";
import { Loading } from "../components/atoms/Loading";
import { api } from "../utils/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../components/atoms/Tag";
import { ICONS } from "../consts";
import { useDefaultHandlers } from "../hooks/useDefaultHandlers";
import { EditTodolist } from "../components/molecules/EditTodolist";
import { CreateTodolist } from "../components/organisms/CreateTodolist";

const HomeHead = () => {
  return (
    <Head>
      <title>Lists</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

const Home: NextPage = () => {
  const { loadingToast } = useCreateToast();

  const { onSuccess, onError } = useDefaultHandlers({ type: "todolist" });

  const allTodoLists = api.todolists.getAll.useQuery(undefined, { onError });

  const deleteTodo = api.todolists.delete.useMutation({
    onSuccess,
    onError,
  });

  const handleDeleteTodo = (id: string) => () => {
    loadingToast("Deleting...");
    deleteTodo.mutate({ id });
  };

  if (allTodoLists.isLoading || !allTodoLists.data) {
    return (
      <>
        <HomeHead />
        <Loading />
      </>
    );
  }

  return (
    <>
      <HomeHead />
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Lists
      </h1>
      <LayoutGroup>
        <>
          <CreateTodolist />
          <Table
            items={allTodoLists.data}
            functions={{
              handleDelete: handleDeleteTodo,
            }}
            EditItem={(item, setIsEditing) => (
              <EditTodolist item={item} setIsEditing={setIsEditing} />
            )}
            LeftExtraRender={(item) => (
              <Link href={`/${item.id}`}>
                <FontAwesomeIcon icon={ICONS.ACCESS} />
              </Link>
            )}
            RightExtraRender={(item) => (
              <Tag type="right">
                <FontAwesomeIcon icon={ICONS[item.type]} />
              </Tag>
            )}
          />
        </>
      </LayoutGroup>
    </>
  );
};

export default Home;
