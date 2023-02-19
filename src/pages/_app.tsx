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

import { Loader } from "../components/templates/Loader";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className="h-[100svh] overflow-auto bg-gradient-to-b from-[var(--primary)] to-[var(--tertiary)] text-white">
        <div className="container relative mx-auto flex h-full max-w-3xl flex-grow flex-col items-center gap-y-8 py-4">
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
