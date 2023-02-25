import Head from "next/head";
import { Loading } from "../atoms/Loading";

export const LoadingScene: React.FC = () => {
  return (
    <>
      <Head>
        <title>T3 Todo</title>
      </Head>
      <Loading />
    </>
  );
};
