import React, { useState } from "react";
import { api } from "../utils/api";
import { getConditions } from "../helpers/getConditions";
import Link from "next/link";
import type { Report } from "./Hero";
import { PulseLoader } from "react-spinners";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";

interface Props {
  report: Report;
}
function DashboardRow({ report }: Props) {
  const [fetched, setFetched] = useState<boolean>(false);
  const deleteWave = api.user.deleteFavorite.useMutation();
  const siteId = report.siteId;
  const router = useRouter();

  function deleteFavorite() {
    deleteWave.mutate({
      siteId,
    });
    router.reload();
  }
  const current = api.forecast.getCurrentLevel.useQuery(
    {
      siteId,
    },
    {
      onSuccess() {
        setFetched(true);
      },
    }
  );

  const currentLevel = current.data?.observation
    .filter((e) => {
      if (e.cfs > 0) {
        return e;
      }
    })
    .pop();

  return (
    <>
      <tr className="hover">
        <td>
          <Link
            href={`/report/${report.siteId}`}
            className="hover:text-slate-200"
          >
            <div className="h-full w-full">{report.siteName}</div>
          </Link>
        </td>
        <td>
          <Link className="hover:text-slate-200" href={`/report/${siteId}`}>
            <div className="h-full w-full">
              {fetched ? (
                <>{currentLevel?.cfs}</>
              ) : (
                <PulseLoader
                  color="rgb(166,173, 187)"
                  size={4}
                  speedMultiplier={0.5}
                />
              )}
            </div>
          </Link>
        </td>

        <td>
          <div className="flex flex-row items-center justify-between">
            <Link className="hover:text-slate-200" href={`/report/${siteId}`}>
              <div className="h-full w-full">
                {fetched ? (
                  <>{getConditions([[currentLevel?.cfs || 0, siteId]])}</>
                ) : (
                  <PulseLoader
                    color="rgb(166,173, 187)"
                    size={4}
                    speedMultiplier={0.5}
                  />
                )}
              </div>
            </Link>
            <button onClick={deleteFavorite}>
              <BsTrash className="hover:text-slate-200" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default DashboardRow;
