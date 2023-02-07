import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div className="flex h-[85vh] items-center justify-center">
        <p className="text-5xl">Oops! There&apos;s nothing here.</p>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
