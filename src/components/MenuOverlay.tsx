import { useEffect } from "react";
import Link from "next/link";

interface Props {
  navbarOpen: boolean;
  setNavbarOpen: (navbarOpen: boolean) => void;
}

const MenuOverlay = ({ navbarOpen, setNavbarOpen }: Props) => {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 750) {
        setNavbarOpen(false);
      }
    }
    // Add event listener to window resize
    window.addEventListener('resize', handleResize);
    // Call the handleResize function once to initialize the state
    handleResize();
    // Remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [setNavbarOpen]);

  return (
    <nav
      className={`fixed flex top-0 min-h-screen left-0 w-full z-20  pt-56 text-xl bg-base-200 text-white/80 bg-opacity-100 sm:text-3xl transform delay-100 transition-all duration-300 ${navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
    >

    </nav>
  );
};

export default MenuOverlay;