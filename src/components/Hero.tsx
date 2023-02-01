import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";

function Hero() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="hero min-h-[95vh] bg-[url('/DaveGardner_04.png')]">
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 font-robotoSlab text-4xl font-bold md:text-5xl">
              Welcome to Magic Moss
            </h1>
            <p className="mb-5 text-xl md:text-2xl">
              View current surf reports and forecasted conditions. Share images
              and interact with your surfing community.
            </p>
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

              {session && "You are logged in."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
