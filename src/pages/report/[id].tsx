import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import CurrentReport from "../../components/CurrentReport";
import LineChart from "../../components/LineChart";
import ForecastTable from "../../components/ForecastTable";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Footer from "../../components/Footer";
import { api } from "../../utils/api";

dayjs.extend(utc);

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
  const siteName = riverData.data?.siteName || "";

  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-screen">
        {observedData.length > 0 ? (
          <div>
            <CurrentReport spot={siteName} level={lastObserved[0]!} />
            <LineChart
              forecastData={forecastData}
              observedData={observedData}
              lastObserved={lastObserved}
            />
            <ForecastTable forecastData={forecastTableData} />
          </div>
        ) : (
          "Loading"
        )}
      </div>
      <div className="container mx-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Report;
