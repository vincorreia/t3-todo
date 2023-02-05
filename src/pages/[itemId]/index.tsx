import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import type { MutableRefObject } from "react";
import { CreateItem } from "../../components/molecules/CreateItem";
import { useCreateToast } from "../../hooks/atoms";
import { api } from "../../utils/api";
import { faArrowLeftLong as faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table } from "../../components/organisms/Table";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query as { itemId: string };
  const { successToast, errorToast, loadingToast } = useCreateToast();

  const item = api.todolists.get.useQuery(itemId);

  const apiContext = api.useContext();

  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };

  const onSuccess = async () => {
    await apiContext.todolists.get.invalidate(itemId);
    successToast("The data has been successfully updated!");
  };
  const createTodo = api.todo.create.useMutation({
    onSuccess,
    onError,
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess,
    onError,
  });

  const editTodo = api.todo.update.useMutation({
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
      <Link href="/" className="absolute top-[5%] left-[10%]">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <h1 className="text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[5rem]">
        {item.data?.content?.title ?? itemId}
      </h1>
      <CreateItem handleCreateTodo={handleCreateTodo} />
      <Table
        items={item.data?.content.todos ?? []}
        functions={{
          handleDelete,
          handleCheck,
          confirmEdit: handleEdit,
        }}
        isChecked="done"
      />
    </>
  );
};

export default ItemPage;
