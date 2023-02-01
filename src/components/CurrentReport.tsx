import React from "react";
import { useRouter } from "next/router";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";
import { getRange } from "../helpers/getRange";
import { getGif } from "../helpers/getGif";
import { getLocation } from "../helpers/getLocation";
import { getReport } from "../helpers/getReport";

interface props {
  level: {
    date: string;
    cfs: number;
    ft: number;
  };
  spot: string;
}

const CurrentReport = ({ level, spot }: props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const siteId: string = router.query.id?.toString() || "";

  const currentLevel = level?.cfs;
  const currentFeet = level?.ft;
  const time = level?.date;
  return (
    <div className="hero mt-8 min-h-fit bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={getGif(siteId)}
          alt="surfing gif"
          className="max-w-xs rounded-lg shadow-2xl md:max-w-sm"
        />
        <div className="flex flex-col items-center lg:items-start">
          {session && (
            <div className="flex h-16 w-full justify-end">
              {/* {favorite && (
                <div className="flex flex-col items-center">
                  <AiFillStar
                    onClick={handleDelete}
                    className="text-3xl text-yellow-500 hover:text-4xl"
                  />
                  <p>Remove favorite</p>
                </div>
              )} */}
              {/* {!favorite && (
                <div className="flex flex-col items-center">
                  <AiOutlineStar
                    onClick={addFavorite}
                    className="text-3xl hover:text-4xl hover:text-yellow-500"
                  />
                  <p>Add to favorites</p>
                </div>
              )} */}
            </div>
          )}
          <h1 className=" py-3 text-center font-robotoSlab text-5xl font-bold sm:text-left">
            {spot}
          </h1>

          <p className="max-w-80 py-3 text-3xl">
            <a
              href={getLocation(siteId)}
              target={"_blank"}
              rel="noreferrer"
              className="flex items-center gap-x-2 hover:text-slate-200"
            >
              <BiMap /> Location
            </a>
          </p>
          <p className="max-w-80 py-3 text-3xl">
            <span className="font-bold">Range of surfable flows: </span>~
            {getRange(siteId)} cfs
          </p>
          <p className="max-w-80 pt-5 pb-3 font-robotoSlab text-4xl">
            The Report for {time}
          </p>
          <p className="max-w-80 py-3 text-2xl">
            Flows are currently at{" "}
            <span className="font-bold">
              {" "}
              {currentLevel} cubic feet per second (cfs)
            </span>{" "}
            and <span className="font-bold">{currentFeet} feet high</span>.
          </p>
          <p className="max-w-80 py-3 text-2xl">
            {getReport(siteId, currentLevel)}
            <span style={{ fontSize: 14 }}> -Atlas</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentReport;
