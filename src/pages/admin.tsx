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
        <div className="flex min-h-[85vh] items-start justify-center gap-x-28 py-32">
          <Admin />
          <AdminWavesTwo />
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
