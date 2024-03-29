import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import type { Report } from "./Hero";
import { PulseLoader } from "react-spinners";
import { BsTrash } from "react-icons/bs";

interface Props {
  report: Report;
  setRowData: Dispatch<SetStateAction<Report[] | undefined>>;
  rowData: Report[];
}
function DashboardRow({ report, setRowData, rowData }: Props) {
  const [fetched, setFetched] = useState<boolean>(false);
  const [levelFetched, setLevelFetched] = useState<boolean>(false);

  const deleteWave = api.user.deleteFavorite.useMutation();
  const siteId = report.siteId;

  function deleteFavorite() {
    deleteWave.mutate({
      siteId,
    });
    setRowData(
      rowData.filter((e) => {
        if (e.siteId !== siteId) {
          return e;
        }
      })
    );
  }
  const current = api.forecast.getCurrentLevel.useQuery(
    {
      siteId,
    },
    {
      onSuccess() {
        setLevelFetched(true);
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

  const currentCondition = api.admin.getCurrentCondition.useQuery(
    {
      siteId,
      currentCfs: currentLevel?.cfs || 0,
    },
    {
      onSuccess(data) {
        if (data?.condition.length) setFetched(true);
      },
    }
  );
  useEffect(() => {
    setTimeout(() => {
      setFetched(true);
    }, 5000);
  });

  const condition = currentCondition.data?.condition;
  const cfsFormatted = currentLevel?.cfs.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

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
              {levelFetched ? (
                <>{cfsFormatted}</>
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
                  <>{condition || "tbd"}</>
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
