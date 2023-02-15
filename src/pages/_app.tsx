import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Toast } from "../components/atoms/Toast";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth/core/types";
import { AuthenticationTemplate } from "../components/templates/AuthenticationTemplate";

import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/auth";
import { Loader } from "../components/templates/Loader";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getServerAuthSession(context),
    },
  };
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className="h-screen overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto flex h-full max-w-3xl flex-grow flex-col items-center gap-y-8 py-4">
          <Loader>
            <AuthenticationTemplate>
              <Component {...pageProps} />
            </AuthenticationTemplate>
          </Loader>
        </div>
      </main>
      <Toast />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
