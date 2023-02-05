import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Toast } from "../components/atoms/Toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <main className="h-screen overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto flex flex-grow flex-col items-center gap-y-8 h-full py-4 max-w-3xl">
          <Component {...pageProps} />
        </div>
      </main>
      <Toast />
    </>
  );
};

export default api.withTRPC(MyApp);
