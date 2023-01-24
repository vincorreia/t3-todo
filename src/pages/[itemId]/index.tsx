import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const ItemPage: React.FC = () => {
  const { query } = useRouter();
  const { itemId } = query;

  const item = api.todolists.getTodolist.useQuery(
    typeof itemId === "string" ? itemId : undefined
  );

  return (
    <>
      <Head>
        <title>{item.data?.content?.title ?? itemId}</title>
      </Head>
      <h1 className="text-5xl">{item.data?.content?.title ?? itemId}</h1>
    </>
  );
};

export default ItemPage;
