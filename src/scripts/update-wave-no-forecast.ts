import { Parser } from "xml2js";
import fetch from "node-fetch";
import dayjs from "dayjs";
import { prisma } from "../server/db";

export default async function fetchRiverData(
  siteId: string,
  siteName: string,
  noaaUrl: string,
  multiplier?: number
) {
  const res = await fetch(noaaUrl);
  const xml = await res.text();
  const xmlParser = new Parser();
  const data = await xmlParser.parseStringPromise(xml);

  const observed = data.site.observed[0]?.datum
    .map((a: any) => {
      return {
        date: a.valid[0]?._,
        cfs: parseFloat(a.secondary[0]?._) * (multiplier || 1),
        ft: parseFloat(a.primary[0]?._),
      };
    })
    .sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .map((data: any) => {
      return {
        date: dayjs(data.date).format("ddd MM/D/YYYY h:mm A"),
        cfs: data.cfs,
        ft: data.ft,
      };
    });

  const filteredObserved = observed
    .filter((data: any, i: number) => {
      const dateParts = data.date.split(" ");
      if (
        dateParts[2] === "12:00" ||
        dateParts[2] === "6:00" ||
        i === observed.length - 1
      ) {
        return data;
      }
      return null;
    })
    .map((data: any) => {
      return {
        date: new Date(dayjs(data.date).format()),
        cfs: data.cfs,
        ft: data.ft,
        siteId,
      };
    });

  // const forecast = data.site.forecast[0]?.datum
  //   ? data.site?.forecast[0]?.datum
  //       .map((a: any) => {
  //         return {
  //           date: a.valid[0]?._,
  //           cfs: parseFloat(a.secondary[0]?._) * (multiplier || 1),
  //           ft: parseFloat(a.primary[0]?._),
  //         };
  //       })
  //       .sort(
  //         (a: any, b: any) =>
  //           new Date(a.date).getTime() - new Date(b.date).getTime()
  //       )
  //       .map((data: any) => {
  //         return {
  //           date: data.date,
  //           cfs: data.cfs,
  //           ft: data.ft,
  //           siteId,
  //         };
  //       })
  //   : null;

  await prisma.$transaction([
    prisma.report.upsert({
      where: { siteId },
      create: {
        siteName,
        siteId,
      },
      update: {
        siteName,
        siteId,
      },
    }),
    prisma.observation.deleteMany({
      where: { siteId },
    }),
    prisma.observation.createMany({ data: filteredObserved }),

    // prisma.forecast.deleteMany({
    //   where: { siteId },
    // }),
    // prisma.forecast.createMany({ data: forecast }),
  ]);
  return data;
}
//'npx tsx src/scripts/update-wave-no-forecast.ts' for updating db in local dev

(async () =>
  await fetchRiverData(
    "14070500",
    "Green Wave",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=debo3&output=xml"
  ))();
