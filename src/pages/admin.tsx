import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import { prisma } from "../server/db";
import { useState } from "react";
import Admin from "../components/Admin";

function admin() {
  return (
    <>
      <Layout>
        <div className="flex h-[85vh] items-center justify-center">
          <h1>This is the admin page</h1>
          <Admin />
        </div>
      </Layout>
    </>
  );
}

export default admin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
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
