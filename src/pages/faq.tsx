import React from "react";
import FaqCollaspe from "../components/FaqCollaspe";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";

const faq = () => {
  return (
    <div>
      <Head>
        <title>FAQ for Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <Header />
      <div className="hero h-[85vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <FaqCollaspe />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default faq;
