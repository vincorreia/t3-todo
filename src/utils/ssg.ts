import type { GetServerSidePropsContext } from "next";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import { getServerAuthSession } from "../server/auth";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

export const getSSGHelpers = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session = await getServerAuthSession({ req, res });
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });
  return ssg;
};
