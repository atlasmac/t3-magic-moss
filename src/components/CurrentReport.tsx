import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Image from "next/image";

interface props {
  level: {
    date: string;
    cfs: number;
    ft: number;
  };
  range:
  | {
    bottomRange: number;
    topRange: number;
    siteId: string;
  }
  | null
  | undefined;
  gif: string;
  spot: string;
}

const CurrentReport = ({ level, spot, gif, range }: props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const siteId: string = router.query.id?.toString() || "";
  const { mutate } = api.user.addFavorite.useMutation();
  const deleteWave = api.user.deleteFavorite.useMutation();
  const getLocation = api.forecast.getLocation.useQuery({ siteId });
  const locationString = getLocation.data?.location || "";
  const getCurrent = api.admin.getCurrentCondition.useQuery({ currentCfs: level?.cfs, siteId: siteId })
  const description = getCurrent.data?.reportDesc || "";
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  api.user.getAllFavorites.useQuery(undefined, {
    onSuccess: (data) => {
      const site = data.filter((e) => {
        if (e.siteId === siteId) {
          return e;
        }
      });
      if (site[0]?.siteId === siteId) {
        setIsFavorite(true);
      }
    },

    onSettled: () => {
      setShowFavorite(true);
    },
  });

  function addFavorite() {
    mutate({
      siteId,
      siteName: spot,
    });
    setIsFavorite(true);
  }
  function deleteFavorite() {
    deleteWave.mutate({
      siteId,
    });
    setIsFavorite(false);
  }

  const currentLevel = level?.cfs;
  const currentFeet = level?.ft;
  const time = level?.date;
  const flowRange = range
    ? `${range.bottomRange.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} - ${range.topRange.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} cfs`
    : "unknown";
  return (
    <div className="hero mt-8 min-h-fit bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        {gif && (
          <Image
            src={gif}
            unoptimized={true}
            priority={true}
            alt="surfing gif"
            width={1000}
            height={1000}
            className="max-w-xs rounded-lg shadow-2xl md:max-w-sm"
          />
        )}
        <div className="flex flex-col items-start lg:items-start">
          <div className="flex h-14 w-full justify-end">
            {session && showFavorite && (
              <>
                {isFavorite ? (
                  <div className="flex flex-col items-center">
                    <AiFillStar
                      onClick={deleteFavorite}
                      className="text-3xl text-yellow-500 hover:text-4xl"
                    />
                    <p>Remove favorite</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <AiOutlineStar
                      onClick={addFavorite}
                      className="text-3xl hover:text-4xl hover:text-yellow-500"
                    />
                    <p>Add to favorites</p>
                  </div>
                )}
              </>
            )}
          </div>

          <h1 className=" pb-3 font-robotoSlab text-4xl font-bold sm:text-left sm:text-5xl">
            {spot}
          </h1>

          <p className="max-w-80 pt-5 pb-3 font-robotoSlab text-3xl sm:text-4xl sm:text-left">
            The Report for {time}
          </p>
          <p className="max-w-80 py-3 text-3xl font-bold font-robotoSlab">
            {currentLevel.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} cfs
          </p>
          <p className="max-w-80 py-3 text-3xl font-bold font-robotoSlab">
            <span className="font-bold">{currentFeet} feet high</span>
          </p>
          {getCurrent.isFetched && <p className="max-w-80 py-3 text-2xl">
            {description ? description : "No report available"}
            <span style={{ fontSize: 14 }}> -Atlas</span>
          </p>}
          <p className="max-w-80 py-3 text-2xl">
            <span className="font-bold">Range of surfable flows: </span>
            {flowRange}
          </p>
          <div className="flex flex-row justify-start w-full">
            {locationString && (
              <p className="max-w-80 py-3 text-2xl ">
                <a
                  href={locationString}
                  target={"_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-x-2 hover:text-slate-200"
                >
                  <BiMap /> Location
                </a>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CurrentReport;
