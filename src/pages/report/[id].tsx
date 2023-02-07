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
import LoadingFull from "../../components/LoadingFull";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createTRPCContext } from "../../server/api/trpc";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../server/db";
import { appRouter } from "../../server/api/root";
import superjson from "superjson";

dayjs.extend(utc);

function Report(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;

  const riverData = api.forecast.getForecast.useQuery({ siteId: id });

  if (riverData.status !== "success") {
    return <LoadingFull />;
  }

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

  const siteName = riverData.data?.siteName || "";

  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-screen">
        <div>
          <CurrentReport spot={siteName} level={lastObserved[0]!} />
          <LineChart
            forecastData={forecastData}
            observedData={observedData}
            lastObserved={lastObserved}
          />
          <ForecastTable forecastData={forecastTableData} />
        </div>
      </div>
      <div className="container mx-auto">
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id as string;
  // prefetch `post.byId`
  await ssg.forecast.getSiteIds.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const siteIds = await prisma.report.findMany({
    select: {
      siteId: true,
    },
  });
  return {
    paths: siteIds.map((report) => ({
      params: {
        id: report.siteId,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: false,
  };
};

export default Report;
