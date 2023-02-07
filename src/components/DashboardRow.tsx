import React, { useState } from "react";
import { api } from "../utils/api";
import { getConditions } from "../helpers/getConditions";
import Link from "next/link";
import { Report } from "./Hero";
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
      onSuccess(data) {
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
          <Link href={`/report/${report.siteId}`}>{report.siteName}</Link>
        </td>
        <td>
          <Link className="" href={`/report/${report.siteId}`}>
            {fetched ? (
              <>{currentLevel?.cfs}</>
            ) : (
              <PulseLoader
                color="rgb(166,173, 187)"
                size={7}
                speedMultiplier={0.5}
              />
            )}
          </Link>
        </td>

        <td>
          <Link href={`/report/${report.siteId}`}>
            {fetched ? (
              <>{getConditions([[currentLevel?.cfs!, report.siteId]])}</>
            ) : (
              <PulseLoader
                color="rgb(166,173, 187)"
                size={4}
                speedMultiplier={1}
              />
            )}
          </Link>
        </td>
      </tr>
    </>
  );
}

export default DashboardRow;
