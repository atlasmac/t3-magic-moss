import React from "react";
import FaqCollaspe from "../components/FaqCollaspe";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faq = () => {
  return (
    <div>
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
