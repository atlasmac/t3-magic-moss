import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

function map() {
  return (
    <>
      <Head>
        <title>Map of surf report on Magic Moss</title>
        <meta name="description" content="Magic Moss Surf Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <Header />
      <div className="z-0 flex h-[85vh] w-screen flex-col items-center justify-center">
        <div className="py-8 text-center">
          <h1 className="mb-5 font-robotoSlab text-5xl font-bold sm:text-left">
            Wave Reports
          </h1>
          <p>New waves added regularly</p>
        </div>

        <MapWithNoSSR />
      </div>
      <Footer />
    </>
  );
}

export default map;
