import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";


interface Props {
  navbarOpen: boolean;
  setNavbarOpen: (navbarOpen: boolean) => void;
}

export default function Header({ setNavbarOpen, navbarOpen }: Props) {
  const { data: session } = useSession();


  return (
    <div className="navbar sticky top-0 z-50 w-full bg-base-100 px-5 shadow-xl md:pb-0">
      <div className="navbar-start flex-1 px-2 lg:flex-none">
        <Link href="/">
          <Image
            className="btn-ghost z-50 rounded-btn btn flex h-[50px] flex-row items-center"
            src={"/default-logo.png"}
            alt="logo"
            height={50}
            width={220}
            priority={true}
          />
        </Link>
      </div>
      <button
        className="md:hidden flex top-0 right-4 z-20 relative w-10 h-10 text-white focus:outline-none"
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        <div className="absolute w-8 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <span
            className={`absolute h-0.5 w-8 bg-white/80 transform transition duration-300 ease-in-out ${navbarOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
              }`}
          ></span>
          <span
            className={`absolute h-0.5 bg-white/80 transform transition-all duration-200 ease-in-out ${navbarOpen ? "w-0 opacity-50" : "w-8 delay-200 opacity-100"
              }`}
          ></span>
          <span
            className={`absolute h-0.5 w-8 bg-white/80 transform transition duration-300 ease-in-out ${navbarOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
              }`}
          ></span>
        </div>
      </button>
      <div className="hidden flex-1 justify-end px-2 md:flex">
        <div className="flex items-stretch">
          <Link href="/map" className="btn-ghost rounded-btn btn">
            Map
          </Link>
          <div className="dropdown-start dropdown">
            <label tabIndex={0} className="btn-ghost rounded-btn btn">
              Reports
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
            >
              <li className="menu-title">
                <span>Montana</span>
              </li>
              <li>
                <Link className="" href="/report/12340500">
                  Brennan&apos;s
                </Link>
              </li>
              <li>
                <Link className="" href="/report/12340000">
                  The Ledge
                </Link>
              </li>
              <li>
                <Link className="" href="/report/06192500">
                  Springdale
                </Link>
              </li>
              <li>
                <Link href="/report/12354500">Zero</Link>
              </li>
              <li className="menu-title">
                <span>Idaho</span>
              </li>
              <li>
                <Link href="/report/13302500">Salmon Whitewater Park</Link>
              </li>
              <li>
                <Link href="/report/13337000">Lochsa&apos;s Pipeline</Link>
              </li>
              <li className="menu-title">
                <span>Wyoming</span>
              </li>
              <li>
                <Link href="/report/13022500">Lunch Counter</Link>
              </li>
              <li className="menu-title">
                <span>Oregon</span>
              </li>
              <li>
                <Link href="/report/14070500">Bend&apos;s Green Wave</Link>
              </li>
            </ul>
          </div>
          <Link href="/faq" className="btn-ghost rounded-btn btn">
            FAQ
          </Link>
          {session && (
            <button
              onClick={() => signOut()}
              className="btn-ghost rounded-btn btn"
            >
              Sign out
            </button>
          )}
          {!session && (
            <button
              onClick={() => signIn()}
              className="btn-ghost rounded-btn btn"
            >
              Sign up / Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
