import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetSessionParams } from "next-auth/react";
import superjson from "superjson";
import { createTRPCContext } from "../server/api/trpc";
import { api } from "../utils/api";
import { appRouter } from "../server/api/root";

function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const { data } = api.user.getAllFavorites.useQuery();

  return (
    <>
      <Head>
        <title>Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero data={data} />
      <Footer />
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
