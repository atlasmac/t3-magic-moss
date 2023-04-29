import Layout from "../components/Layout";

function NotFound() {
  return (
    <>
      <Layout>
        <div className="flex h-[85vh] items-center justify-center">
          <p className="text-2xl w-[80vw] sm:text-5xl">Oops! There&apos;s nothing here.</p>
        </div>
      </Layout>
    </>
  );
}

export default NotFound;
