import type { SetStateAction, Dispatch } from "react";
import DashboardRow from "./DashboardRow";
import type { Report } from "./Hero";

interface Props {
  rowData: Report[] | undefined;
  setRowData: Dispatch<SetStateAction<Report[] | undefined>>;
}

function DashboardTable({ rowData, setRowData }: Props) {
  const rows = rowData?.map((e) => {
    return (
      <DashboardRow
        report={e}
        key={e.siteId}
        setRowData={setRowData}
        rowData={rowData}
      />
    );
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
