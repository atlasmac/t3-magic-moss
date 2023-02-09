import React, { useState } from "react";
import { api } from "../utils/api";
import { getConditions } from "../helpers/getConditions";
import Link from "next/link";
import type { Report } from "./Hero";
import { PulseLoader } from "react-spinners";

interface Props {
  report: Report;
}
function DashboardRow({ report }: Props) {
  const [fetched, setFetched] = useState<boolean>(false);
  const current = api.forecast.getCurrentLevel.useQuery(
    {
      siteId: report.siteId,
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
            {report.siteName}
          </Link>
        </td>
        <td>
          <Link
            className="hover:text-slate-200"
            href={`/report/${report.siteId}`}
          >
            {fetched ? (
              <>{currentLevel?.cfs}</>
            ) : (
              <PulseLoader
                color="rgb(166,173, 187)"
                size={4}
                speedMultiplier={0.5}
              />
            )}
          </Link>
        </td>

        <td>
          <Link
            className="hover:text-slate-200"
            href={`/report/${report.siteId}`}
          >
            {fetched ? (
              <>{getConditions([[currentLevel?.cfs || 0, report.siteId]])}</>
            ) : (
              <PulseLoader
                color="rgb(166,173, 187)"
                size={4}
                speedMultiplier={0.5}
              />
            )}
          </Link>
        </td>
      </tr>
    </>
  );
}

export default DashboardRow;
