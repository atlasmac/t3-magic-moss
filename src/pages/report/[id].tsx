import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { api } from "../../utils/api";
function Report() {
  const router = useRouter();
  const siteId: string = router.query.id?.toString() || "";
  const riverData = api.forecast.getForecast.useQuery({ siteId });

  const observedData =
    riverData.data?.observation
      .map((e) => {
        let date = new Date(e.date);
        return {
          date: dayjs(date).format("ddd MM/D h:mm A"),
          cfs: e.cfs,
          ft: e.ft,
        };
      })
      .filter((e) => {
        if (e.cfs > 0) {
          return e;
        }
      }) || [];

  const lastObserved =
    observedData?.filter((el, i, arr) => i === arr.length - 1) || [];

  const forecastData =
    riverData.data?.forecast.map((e) => {
      let date = new Date(e.date);

      return {
        date: dayjs(date).format("ddd MM/D h:mm A"),
        cfs: e.cfs,
        ft: e.ft,
      };
    }) || [];

  const forecastTableData =
    riverData.data?.forecast
      .map((e) => {
        return {
          date: dayjs(e.date).utc().format("ddd MM/D h:mm A"),
          cfs: e.cfs,
          ft: e.ft,
        };
      })
      .filter((data) => {
        let dateParts = data.date.split(" ");
        return dateParts[2] === "12:00" && dateParts[3] === "PM";
      }) || [];

  console.log(forecastTableData);
  const siteName = riverData.data?.siteName;

  return (
    <div>
      <Header />
      {observedData.length > 0 ? (
        <div>
          <LineChart
            forecastData={forecastData}
            observedData={observedData}
            lastObserved={lastObserved}
          />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Report;
