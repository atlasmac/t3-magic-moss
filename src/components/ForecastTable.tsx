import React from "react";
import { useRouter } from "next/router";
import { getConditions } from "../helpers/getConditions";
import { Observation } from "./LineChart";

interface Props {
  forecastData: Observation;
}

const ForecastTable = ({ forecastData }: Props) => {
  const router = useRouter();
  const siteId: string = router.query.id?.toString() || "";

  const headers: any[] = [];
  const flows: any[] = [];
  const height: any[] = [];
  const waveDescription: [number, string][] = [];

  forecastData.forEach((data) => {
    headers.push(<td key={data.date}>{data.date.split(" ")[0]}</td>);
    flows.push(<td key={data.date}>{data.cfs}</td>);
    height.push(<td key={data.date}>{data.ft}</td>);
    waveDescription.push([data.cfs, siteId]);
  });

  const conditionsTd = getConditions(waveDescription).map((el, i) => (
    <td key={`${i}${el}`}>{el}</td>
  ));

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
              <th></th>
              {headers}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cubic Feet / Second </th>
              {flows}
            </tr>
            <tr>
              <th>Height (Feet)</th>
              {height}
            </tr>
            <tr>
              <th>Wave Condition</th>
              {conditionsTd}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForecastTable;
