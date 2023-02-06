import React, { useState } from "react";
import { api } from "../utils/api";
import { getConditions } from "../helpers/getConditions";
import Link from "next/link";

interface Props {
  data: {
    siteId: string;
    siteName: string;
  };
}

function DashboardRow({ data }: Props) {
  const [settled, setSettled] = useState<boolean>(false);

  const current = api.forecast.getCurrentLevel.useQuery(
    {
      siteId: data.siteId,
    },
    {
      onSettled: (data) => {
        setSettled(true);
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

  console.log(currentLevel);

  return (
    <>
      {settled && (
        <tr className="hover">
          <td>
            <Link href={`/report/${data.siteId}`}>{data.siteName}</Link>
          </td>
          <td>
            <Link className="" href={`/report/${data.siteId}`}>
              {currentLevel?.cfs}
            </Link>
          </td>

          <td>
            <Link href={`/report/${data.siteId}`}>
              {getConditions([[currentLevel?.cfs!, data.siteId]])}
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}

export default DashboardRow;
