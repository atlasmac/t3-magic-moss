import React from "react";
import { useRouter } from "next/router";
import type { Observation } from "./LineChart";
import ConditionTd from "./ConditionTd";

interface Props {
  forecastData: Observation;
}
type Td = {
  td: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >;
};

const ForecastTable = ({ forecastData }: Props) => {
  const router = useRouter();
  const siteId: string = router.query.id?.toString() || "";

  const headers: Td["td"][] = [];
  const flows: Td["td"][] = [];
  const height: Td["td"][] = [];
  const waveDescription: number[] = [];

  forecastData.forEach((data) => {
    const cfsFormatted = data.cfs.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    headers.push(<td key={data.date}>{data.date.split(" ")[0]}</td>);
    flows.push(<td key={data.date}>{cfsFormatted}</td>);
    height.push(<td key={data.date}>{data.ft}</td>);
    waveDescription.push(data.cfs);
  });

  const conditionTds = waveDescription.map((e, i) => {
    return <ConditionTd key={i} siteId={siteId} cfs={e}></ConditionTd>;
  });

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="font-robotoSlab text-3xl font-bold">
          Daily Forecast Levels
        </h2>
      </div>
      <div className="scrollbar-corner-full mt-3 overflow-scroll overflow-x-auto pb-1 scrollbar-thin scrollbar-track-base-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
        <table className="mb-1 table w-full">
          <thead>
            <tr>
              <>
                <th></th>
                {headers}
              </>
            </tr>
          </thead>
          <tbody>
            <tr>
              <>
                <th>Cubic Feet / Second </th>
                {flows}
              </>
            </tr>
            <tr>
              <>
                <th>Height (Feet)</th>
                {height}
              </>
            </tr>
            <tr>
              <>
                <th>Wave Condition</th>
                {conditionTds}
              </>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForecastTable;
