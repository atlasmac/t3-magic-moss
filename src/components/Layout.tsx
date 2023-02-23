import Header from "./Header";
import Footer from "./Footer";
interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
