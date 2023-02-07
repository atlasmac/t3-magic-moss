import React from "react";
import Header from "./Header";
import { ClipLoader } from "react-spinners";

function LoadingFull() {
  return (
    <>
      <Header />
      <div className="flex h-screen w-screen items-center justify-center">
        <ClipLoader
          color="rgb(166,173, 187)"
          loading
          size={100}
          speedMultiplier={0.4}
        />
      </div>
    </>
  );
}

export default LoadingFull;
