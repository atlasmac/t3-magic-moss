import React from "react";
import DashboardRow from "./DashboardRow";
import type { HeroProps } from "./Hero";

function DashboardTable({ data }: HeroProps) {
  const rows = data?.map((e) => {
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
