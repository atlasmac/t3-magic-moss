import React from "react";
import FaqCollaspe from "../components/FaqCollaspe";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Layout from "../components/Layout";

const faq = () => {
  return (
    <>
      <Head>
        <title>FAQ for Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <Layout>
        <div className="hero h-[85vh] bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <FaqCollaspe />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default faq;
