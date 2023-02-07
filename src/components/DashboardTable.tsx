import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import DashboardRow from "./DashboardRow";
import { HeroProps } from "./Hero";

function DashboardTable({ data }: HeroProps) {
  const { data: session } = useSession();

  const rows = data?.map((e, i) => {
    return <DashboardRow report={e} key={e.siteId} />;
  });

  return (
    <div className="overflow-x-auto">
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
    </div>
  );
}

export default DashboardTable;
