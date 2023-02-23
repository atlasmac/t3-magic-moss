import Header from "./Header";
import Footer from "./Footer";
interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
