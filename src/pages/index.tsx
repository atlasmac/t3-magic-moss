import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Home;
