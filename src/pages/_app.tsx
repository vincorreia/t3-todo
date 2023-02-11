import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Toast } from "../components/atoms/Toast";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth/core/types";
import { useSession, signIn } from "next-auth/react";
import { type NextPage } from "next";
import Head from "next/head";
import { Loading } from "../components/atoms/Loading";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <AuthShowcase>
          <Component {...pageProps} />
        </AuthShowcase>
      </Layout>
      <Toast />
    </SessionProvider>
  );
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto flex h-full max-w-3xl flex-grow flex-col items-center gap-y-8 py-4">
        {children}
      </div>
    </main>
  );
};

type AuthShowcaseProps = {
  children: React.ReactNode;
};
const AuthShowcase: NextPage<AuthShowcaseProps> = ({ children }) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex h-full w-full flex-col justify-center gap-4">
        <h1 className="text-5xl text-white">Welcome!</h1>
        <p className="text-xl text-white">
          Please sign in to continue using the app.
        </p>
        <button
          className="self-end rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signIn("google")}
        >
          {"Sign in"}
        </button>
        
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
