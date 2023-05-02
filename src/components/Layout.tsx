import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";
interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <NavBar
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
      />
      <div>
        <MenuOverlay
          navbarOpen={navbarOpen}
          setNavbarOpen={setNavbarOpen}
        />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
