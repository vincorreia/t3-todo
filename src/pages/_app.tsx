import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="h-screen flex flex-col overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col flex-grow mx-auto items-center justify-center gap-y-8">
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default api.withTRPC(MyApp);
