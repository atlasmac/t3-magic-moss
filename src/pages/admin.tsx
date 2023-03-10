import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import { prisma } from "../server/db";
import Admin from "../components/Admin";
import AdminWavesTwo from "../components/AdminWavesTwo";

function admin() {
  return (
    <>
      <Layout>
        <div className="flex min-h-[85vh] flex-col items-center justify-start py-20">
          <div className="my-10 flex flex-col gap-y-3 text-center">
            <h1 className="text-5xl">Admin Page</h1>
            <p>Grant/Remove admin status and edit wave data</p>
          </div>
          <div className="flex gap-x-28">
            <Admin />
            <AdminWavesTwo />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default admin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const admin = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      isAdmin: true,
    },
  });
  if (admin?.isAdmin !== true) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
