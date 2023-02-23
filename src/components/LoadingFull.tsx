import React from "react";
import { ClipLoader } from "react-spinners";
import Layout from "./Layout";

function LoadingFull() {
  return (
    <>
      <Layout>
        <div className="flex h-screen w-screen items-center justify-center">
          <ClipLoader
            color="rgb(166,173, 187)"
            loading
            size={100}
            speedMultiplier={0.4}
          />
        </div>
      </Layout>
    </>
  );
}

export default LoadingFull;
