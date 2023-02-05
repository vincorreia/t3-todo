import { type NextPage } from "next";
import Head from "next/head";
import { type MutableRefObject } from "react";
import { CreateItem } from "../components/molecules/CreateItem";
import { Table } from "../components/organisms/Table";
import { useCreateToast } from "../hooks/atoms";

import { api } from "../utils/api";

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
    (createTodoInput: MutableRefObject<HTMLInputElement | null>) =>
    async () => {
      const input = createTodoInput.current;

      loadingToast("Creating...");
      if (input?.value) {
        const response = await todolistsMutation.mutateAsync({
          title: input.value,
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
  return (
    <>
      <Head>
        <title>Lists</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Lists
      </h1>

      <CreateItem handleCreateTodo={handleCreateTodo} />

      <Table
        items={allTodoLists.data ?? []}
        functions={{
          handleDelete: handleDeleteTodo,
          confirmEdit: confirmEditTodolist,
        }}
      />
    </>
  );
};

export default Home;
