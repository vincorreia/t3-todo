type AuthShowcaseProps = {
  children: React.ReactNode;
};
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoadingScene } from "../organisms/LoadingScene";
import { LogoutBTN } from "../atoms/LogoutBTN";

export const AuthenticationTemplate: React.FC<AuthShowcaseProps> = ({
  children,
}) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        {children}
        <LogoutBTN className="sticky lg:fixed bottom-10 left-10" />
      </>
    );
  }

  if (status === "loading") {
    return <LoadingScene />;
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex h-full w-full flex-col justify-center gap-4 px-6 lg:px-0">
        <h1 className="text-5xl text-white">Welcome!</h1>
        <p className="text-xl text-white">
          Please sign in to continue using the app.
        </p>
        <button
          className="flex items-center justify-center gap-x-2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 sm:self-end"
          onClick={() => void signIn("google")}
        >
          <FontAwesomeIcon size="lg" icon={faGoogle} />
          {"Sign in with Google"}
        </button>
      </div>
    </>
  );
};
