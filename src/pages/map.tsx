import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

function map() {
  return (
    <div>
      <Header />
      <div className=" flex h-[85vh] w-screen flex-col items-center justify-center">
        <div className="py-8 text-center">
          <h1 className="mb-5 font-robotoSlab text-5xl font-bold sm:text-left">
            Wave Reports
          </h1>
          <p>New waves added regularly</p>
        </div>

        <MapWithNoSSR />
      </div>
      <Footer />
    </div>
  );
}

export default map;
