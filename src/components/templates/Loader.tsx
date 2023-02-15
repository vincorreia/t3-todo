import Router from "next/router";
import { useState } from "react";
import { LoadingScene } from "../organisms/LoadingScene";

type Props = {
  children: React.ReactNode;
};
export const Loader: React.FC<Props> = ({ children }) => {
  const [gettingServerSideProps, setGettingServerSideProps] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setGettingServerSideProps(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setGettingServerSideProps(false);
  });

  if (gettingServerSideProps) {
    return <LoadingScene />;
  }

  return <>{children}</>;
};
