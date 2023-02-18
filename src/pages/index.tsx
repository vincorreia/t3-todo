import { LayoutGroup } from "framer-motion";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState, type MutableRefObject } from "react";
import { CreateItem } from "../components/molecules/CreateItem";
import { Table } from "../components/organisms/Table";
import { useCreateToast } from "../hooks/atoms";
import type { InputRef } from "../types/Ref";
import { Loading } from "../components/atoms/Loading";
import { api } from "../utils/api";
import { getSSGHelpers } from "../utils/ssg";
import { TypeSelector } from "../components/atoms/TypeSelector";
import type { EditTodolistParams, TodolistType } from "../types/Todolist";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../components/atoms/Tag";
import { ICONS } from "../consts";
import { EditItem } from "../components/atoms/EditItem";

const HomeHead = () => {
  return (
    <Head>
      <title>Lists</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const ssg = await getSSGHelpers(req, res);

  await ssg.todolists.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Home: NextPage = () => {
  const { successToast, loadingToast, errorToast } = useCreateToast();

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };
  const allTodoLists = api.todolists.getAll.useQuery(undefined, { onError });

  const apiContext = api.useContext();

  const onSuccess = async () => {
    await apiContext.todolists.getAll.invalidate();
    successToast("The data has been successfully updated!");
  };

  const deleteTodo = api.todolists.delete.useMutation({
    onSuccess,
    onError,
  });

  const editTodo = api.todolists.edit.useMutation({
    onSuccess,
    onError,
  });

  const todolistsMutation = api.todolists.create.useMutation({
    onSuccess,
    onError,
  });

  const [type, setType] = useState<TodolistType>("TODO");

  const handleChangeType = (newType: TodolistType) => () => {
    setType(newType);
  };
  const handleCreateTodo =
    (createTodoInput?: MutableRefObject<InputRef | null>) => async () => {
      const input = createTodoInput?.current?.inputRef.current;
      const parsedValue = createTodoInput?.current?.validate(input?.value);

      if (input && parsedValue) {
        loadingToast("Creating...");
        const response = await todolistsMutation.mutateAsync({
          title: parsedValue,
          type,
        });
        if (response) {
          input.value = "";
        }
      }
    };

  const handleDeleteTodo = (id: string) => () => {
    loadingToast("Deleting...");
    deleteTodo.mutate({ id });
  };

  const confirmEditTodolist = ({ id, title, type }: EditTodolistParams) => {
    loadingToast("Editing...");
    editTodo.mutate({
      id,
      title,
      type,
    });
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
          <CreateItem
            handleCreateTodo={handleCreateTodo}
            ExtraFields={
              <TypeSelector type={type} handleChangeType={handleChangeType} />
            }
          />

          <Table
            items={allTodoLists.data}
            functions={{
              handleDelete: handleDeleteTodo,
            }}
            EditItem={(item, setIsEditing) => (
              <EditItem
                item={item}
                confirmEdit={confirmEditTodolist}
                setIsEditing={setIsEditing}
              />
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
