import { useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";


interface Props {
  navbarOpen: boolean;
  setNavbarOpen: (navbarOpen: boolean) => void;
}

const MenuOverlay = ({ navbarOpen, setNavbarOpen }: Props) => {
  const { data: session } = useSession();

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
      className={`fixed flex top-0 min-h-screen left-0 w-full z-20  pt-14 text-sm bg-base-200 text-white/80 bg-opacity-100 transform delay-100 transition-all duration-300 ${navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
    >
      <div></div>
      <ul className="menu bg-base-200 mx-auto w-full p-3 text-center">
        <li className="text-slate-500 text-xl py-2">
          Navigation
        </li>
        <li>
          <Link href="/faq"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              FAQ
            </span>
          </Link>
        </li>
        {session ? (
          <li>
            <button
              onClick={() => {
                signOut()
                setNavbarOpen(false)
              }}
            >
              <span className="mx-auto">
                Sign out
              </span>
            </button>
          </li>
        ) :
          (
            <li>
              <button
                onClick={() => {
                  signIn()
                  setNavbarOpen(false)
                }}
              >
                <span className="mx-auto">
                  Sign up / Login

                </span>
              </button>
            </li>
          )}
        <li className="text-slate-500">
          Montana
        </li>
        <li>
          <Link href="/report/12340500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Brennan&apos;s
            </span>
          </Link>
        </li>

        <li>
          <Link href="/report/12340000"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              The Ledge
            </span>
          </Link>
        </li>

        <li>
          <Link href="/report/12354500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Zero
            </span>
          </Link>
        </li>

        <li>
          <Link href="/report/06192500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Springdale
            </span>
          </Link>
        </li>
        <li className="text-slate-500">
          Idaho
        </li>
        <li>
          <Link href="/report/13302500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Salmon Whitewater Park
            </span>
          </Link>
        </li>
        <li>
          <Link href="/report/13337000"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Lochsa&apos;s Pipeline
            </span>
          </Link>
        </li>
        <li className="text-slate-500">
          Wyoming
        </li>
        <li>
          <Link href="/report/13022500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Lunch Counter
            </span>
          </Link>
        </li>
        <li className="text-slate-500">
          Oregon
        </li>
        <li>
          <Link href="/report/14070500"
            onClick={() => {
              setNavbarOpen(false)
            }}>
            <span className="mx-auto">
              Bend&apos;s Green Wave
            </span>
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default MenuOverlay;