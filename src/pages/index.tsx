import { LayoutGroup } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import { type MutableRefObject } from "react";
import { CreateItem } from "../components/molecules/CreateItem";
import { Table } from "../components/organisms/Table";
import { useCreateToast } from "../hooks/atoms";
import type { InputRef } from "../types/Ref";
import { Loading } from "../components/atoms/Loading";
import { api } from "../utils/api";

const HomeHead = () => {
  return (
    <Head>
      <title>Lists</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

const Home: NextPage = () => {
  const allTodoLists = api.todolists.getAll.useQuery();

  const { successToast, loadingToast, errorToast } = useCreateToast();

  const apiContext = api.useContext();

  const onSuccess = async () => {
    await apiContext.todolists.getAll.invalidate();
    successToast("The data has been successfully updated!");
  };

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
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

  const handleCreateTodo =
    (createTodoInput?: MutableRefObject<InputRef | null>) => async () => {
      const input = createTodoInput?.current?.inputRef.current;
      const parsedValue = createTodoInput?.current?.validate(input?.value);

      if (input && parsedValue) {
        loadingToast("Creating...");
        const response = await todolistsMutation.mutateAsync({
          title: parsedValue,
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

  const confirmEditTodolist = (id: string, title: string) => {
    loadingToast("Editing...");
    editTodo.mutate({
      id,
      title,
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
          <CreateItem handleCreateTodo={handleCreateTodo} />

          <Table
            items={allTodoLists.data}
            functions={{
              handleDelete: handleDeleteTodo,
              confirmEdit: confirmEditTodolist,
            }}
          />
        </>
      </LayoutGroup>
    </>
  );
};

export default Home;
