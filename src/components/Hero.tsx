import React from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import DashboardTable from "./DashboardTable";

export type Report = {
  siteName: string;
  siteId: string;
};

export interface HeroProps {
  data: Report[] | undefined;
}

function Hero({ data }: HeroProps) {
  const { data: session } = useSession();

  return (
    <div>
      <div className="hero min-h-[85vh] bg-[url('/DaveGardner_04.png')]">
        <div className="hero-overlay bg-opacity-70"></div>

        <div className="flex h-full max-w-lg flex-col justify-start py-20 text-center text-neutral-content">
          <h1 className="mb-5 font-robotoSlab text-4xl font-bold md:text-5xl">
            Welcome to Magic Moss
          </h1>

          {session ? (
            <>
              {data && data?.length > 0 ? (
                <>
                  <p className="mb-5 text-xl md:text-2xl">
                    Hello {session.user.name}. Here are your favorite waves and
                    their current levels.
                  </p>
                  <DashboardTable data={data} />
                </>
              ) : (
                <p className="mb-5 text-xl md:text-2xl">
                  Hello {session.user.name}, you don&apos;t have any favorite
                  waves saved yet. Try{" "}
                  <Link href={"/report/12340500"} className="underline">
                    Brennan&apos;s
                  </Link>
                </p>
              )}
            </>
          ) : (
            <p className="mb-5 text-xl md:text-2xl">
              View current surf reports and forecasted conditions. Share images
              and interact with your surfing community.
            </p>
          )}

          <div className="md:h-[40vh]">
            {!session && (
              <div>
                <div className="flex flex-col items-center gap-y-3 pt-6">
                  <button
                    type="button"
                    onClick={() => signIn()}
                    className="btn-accent btn"
                  >
                    <span className="flex flex-row items-center gap-x-1">
                      <FcGoogle size={20} />
                      Login / Sign up
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
