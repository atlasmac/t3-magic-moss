import React, { useState } from "react";
import { api } from "../utils/api";
import { getConditions } from "../helpers/getConditions";
import Link from "next/link";
import { Report } from "./Hero";

interface Props {
  report: Report;
}
function DashboardRow({ report }: Props) {
  const current = api.forecast.getCurrentLevel.useQuery({
    siteId: report.siteId,
  });

  const currentLevel = current.data?.observation
    .filter((e) => {
      if (e.cfs > 0) {
        return e;
      }
    })
    .pop();

  console.log("hi");

  return (
    <>
      <tr className="hover">
        <td>
          <Link href={`/report/${report.siteId}`}>{report.siteName}</Link>
        </td>
        <td>
          <Link className="" href={`/report/${report.siteId}`}>
            {currentLevel?.cfs}
          </Link>
        </td>

        <td>
          <Link href={`/report/${report.siteId}`}>
            {getConditions([[currentLevel?.cfs!, report.siteId]])}
          </Link>
        </td>
      </tr>
    </>
  );
}

export default DashboardRow;
