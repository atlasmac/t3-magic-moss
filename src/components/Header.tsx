import React from "react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="navbar rounded-box bg-base-300">
      <div className="navbar-start md:hidden">
        {/* MObile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <HiMenu className="h-6 w-6"></HiMenu>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {session && (
              <li>
                <Link href="/dashboard" className="btn-ghost rounded-btn btn">
                  Dashboard
                </Link>
              </li>
            )}
            {!session && (
              <li>
                <Link
                  href="/"
                  onClick={() => signIn()}
                  className="btn-ghost rounded-btn btn"
                >
                  Sign up / Login
                </Link>
              </li>
            )}
            <li tabIndex={0}>
              <span className="btn-ghost rounded-btn btn">Surf Reports</span>
              <ul className="bg-base-100 p-2">
                <li className="menu-title">
                  <span>Montana</span>
                </li>
                <li>
                  <Link href="/report/12340500">Brennan's</Link>
                </li>
                <li>
                  <Link href="/report/12354500">Zero</Link>
                </li>
                <li className="menu-title">
                  <span>Idaho</span>
                </li>
                <li>
                  <Link href="/report/13337000">Lochsa's Pipeline</Link>
                </li>
                <li className="menu-title">
                  <span>Wyoming</span>
                </li>
                <li>
                  <Link href="/report/13022500">Lunch Counter</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/faq" className="btn-ghost rounded-btn btn">
                FAQ
              </Link>
            </li>
            {session && (
              <li>
                <button
                  onClick={() => signOut()}
                  className="btn-ghost rounded-btn btn"
                >
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-end flex-1 px-2 md:navbar-start lg:flex-none">
        <Link href="/">
          <Image
            src={"/default-logo.png"}
            alt="logo"
            height={180}
            width={180}
          />
        </Link>
      </div>
      <div className="hidden flex-1 justify-end px-2 md:flex">
        <div className="flex items-stretch">
          {/* deskhrefp menu */}
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
                  Brennan's
                </Link>
              </li>
              <li>
                <Link href="/report/12354500">Zero</Link>
              </li>
              <li className="menu-title">
                <span>Idaho</span>
              </li>
              <li>
                <Link href="/report/13337000">Lochsa's Pipeline</Link>
              </li>
              <li className="menu-title">
                <span>Wyoming</span>
              </li>
              <li>
                <Link href="/report/13022500">Lunch Counter</Link>
              </li>
            </ul>
          </div>
          <Link href="/faq" className="btn-ghost rounded-btn btn">
            FAQ
          </Link>
          {session && (
            <Link href="/dashboard" className="btn-ghost rounded-btn btn">
              Dashboard
            </Link>
          )}
          {session && (
            <button
              onClick={() => signOut()}
              className="btn-ghost rounded-btn btn"
            >
              Sign out
            </button>
          )}
          {!session && (
            <Link
              href="/"
              onClick={() => signIn()}
              className="btn-ghost rounded-btn btn"
            >
              Sign up / Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
