import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import DashboardRow from "./DashboardRow";
import { api } from "../utils/api";

function DashboardTable() {
  const { data: session } = useSession();
  const [settled, setSettled] = useState<boolean>(false);

  const favoriteWaves = api.user.getAllFavorites.useQuery(undefined, {
    onSuccess(data) {
      if (data.length > 0) {
        setSettled(true);
      }
    },
  });

  const rows = favoriteWaves.data?.map((data, i) => {
    return <DashboardRow data={data} key={data.siteId} />;
  });

  return (
    <div className="overflow-x-auto">
      {settled && (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Spot</th>
              <th>CFS</th>
              <th>Condition</th>
            </tr>
          </thead>

          <tbody>
            {rows}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardTable;
