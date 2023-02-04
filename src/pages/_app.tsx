import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Toast } from "../components/atoms/Toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <main className="flex h-screen flex-col overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto flex flex-grow flex-col items-center justify-center gap-y-8">
          <Component {...pageProps} />
        </div>
      </main>
      <Toast />
    </>
  );
};

export default api.withTRPC(MyApp);
