import Head from "next/head";
import { Loading } from "../atoms/Loading";

export const LoadingScene: React.FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <Loading />
    </>
  );
};
