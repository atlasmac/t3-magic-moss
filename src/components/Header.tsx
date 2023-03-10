import React from "react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="navbar rounded-box z-40 bg-base-300">
      <div className="navbar-start md:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <HiMenu className="h-6 w-6"></HiMenu>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/map" className="btn-ghost rounded-btn btn">
                Map
              </Link>
            </li>
            {!session && (
              <li>
                <button
                  onClick={() => signIn()}
                  className="btn-ghost rounded-btn btn"
                >
                  Sign up / Login
                </button>
              </li>
            )}

            <li tabIndex={0}>
              <span className="btn-ghost rounded-btn btn">Surf Reports</span>
              <ul className="bg-base-100 p-2">
                <li className="menu-title">
                  <span>Montana</span>
                </li>
                <li>
                  <Link href="/report/12340500">Brennan&apos;s</Link>
                </li>
                <li>
                  <Link href="/report/12340000">The Ledge</Link>
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
            className="btn-ghost rounded-btn btn flex h-[50px] flex-row items-center"
            src={"/default-logo.png"}
            alt="logo"
            height={50}
            width={220}
          />
        </Link>
      </div>
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
