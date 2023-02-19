import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import type { RefObject, MutableRefObject } from "react";
import { CreateItem } from "../../components/molecules/CreateItem";
import { useCreateToast, useToastAtom } from "../../hooks/atoms";
import { api } from "../../utils/api";
import { faArrowLeftLong as faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table } from "../../components/organisms/Table";
import { LayoutGroup } from "framer-motion";
import type { InputRef } from "../../types/Ref";
import { Loading } from "../../components/atoms/Loading";
import { type GetServerSideProps } from "next";
import { getSSGHelpers } from "../../utils/ssg";
import { Checkbox } from "../../components/atoms/Checkbox";
import { EditItem } from "../../components/atoms/EditItem";

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
  const { successToast, errorToast, loadingToast } = useCreateToast();
  const [{ type: toastType }] = useToastAtom();
  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };

  const item = api.todolists.get.useQuery(itemId, { onError });

  const apiContext = api.useContext();

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

  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      loadingToast("Updating...");
      checkTodo.mutate({
        id,
        done: e.target.checked,
      });
    };

  const handleCreateTodo = (ref?: MutableRefObject<InputRef | null>) => {
    return async () => {
      const input = ref?.current?.inputRef.current;

      const parsedInput = ref?.current?.validate(input?.value);

      if (input && parsedInput) {
        loadingToast("Creating...");
        const response = await createTodo.mutateAsync({
          title: parsedInput,
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

  const handleConfirmEdit = (ref: RefObject<InputRef>) => () => {
    const input = ref.current?.inputRef.current;
    const parsedInput = ref.current?.validate(input?.value);
    if (input && parsedInput) {
      handleEdit(itemId, parsedInput);
    }
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
        <CreateItem handleCreateTodo={handleCreateTodo} />
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
            <EditItem
              confirmEdit={handleConfirmEdit}
              item={item}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </LayoutGroup>
    </>
  );
};

export default ItemPage;
