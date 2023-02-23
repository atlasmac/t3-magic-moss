import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { api } from "../utils/api";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

function map() {
  const sites = api.forecast.getSiteIds.useQuery();

  return (
    <>
      <Head>
        <title>Map of Surf Reports by Magic Moss</title>
        <meta
          name="description"
          content="A map of surf reports in Montana, Idaho and Wyoming brought to you by Magic Moss."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <Header />
      <div className="z-0 flex h-[85vh] w-screen flex-col items-center justify-start">
        <div className="py-8 text-center">
          <h1 className="mb-5 font-robotoSlab text-5xl font-bold sm:text-left">
            Wave Reports
          </h1>
          <div className="mt-3 flex flex-col items-center gap-y-1">
            <h2 className="text-xl">Current Conditions</h2>
            <div className="flex items-center justify-center gap-x-10">
              <span className=" text-2xl text-teal-400">
                <FaThumbsUp />
              </span>
              <span className=" text-2xl text-red-400">
                <FaThumbsDown />
              </span>
            </div>
          </div>
        </div>

        <MapWithNoSSR data={sites.data} isLoading={sites.isLoading} />
      </div>
      <Footer />
    </>
  );
}

export default map;
