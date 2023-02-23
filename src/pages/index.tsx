import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import { getSession, useSession } from "next-auth/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { createTRPCContext } from "../server/api/trpc";
import { api } from "../utils/api";
import { appRouter } from "../server/api/root";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Layout from "../components/Layout";
//props: InferGetServerSidePropsType<typeof getServerSideProps> // don't need to pass props for prefetch?

function Home() {
  const { data: session } = useSession();
  const favorites = session ? api.user.getAllFavorites.useQuery() : null;

  return (
    <>
      <Head>
        <title>Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <Layout>
        <Hero data={favorites?.data} />
      </Layout>
    </>
  );
}

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createTRPCContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });
  /*
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.user?.getAllFavorites.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      session,
    },
  };
}
