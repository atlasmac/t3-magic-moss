import { Parser } from "xml2js";
import fetch from "node-fetch";
import fs from "fs";
const siteId = "13022500";
const siteName = "Lunch Counter";
import dayjs from "dayjs";
import { prisma } from "../server/db";

async function fetchWeather() {
  // const writeFile = promisify(fs.writeFile);

  const res = await fetch(
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=alpw4&output=xml"
  );
  const xml = await res.text();
  const xmlParser = new Parser();
  const data = await xmlParser.parseStringPromise(xml);
  // const json = JSON.stringify(data, null, 2);
  // console.log(json);

  const observed = data.site.observed[0]?.datum
    .map((a: any) => {
      return {
        date: a.valid[0]?._,
        cfs: parseFloat(a.secondary[0]?._) * 1000,
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
    .filter((data: any, i: Number) => {
      let dateParts = data.date.split(" ");
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

  const forecast = data.site.forecast[0]?.datum
    .map((a: any) => {
      return {
        date: a.valid[0]?._,
        cfs: parseFloat(a.secondary[0]?._) * 1000,
        ft: parseFloat(a.primary[0]?._),
      };
    })
    .sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .map((data: any) => {
      return {
        date: data.date,
        cfs: data.cfs,
        ft: data.ft,
        siteId,
      };
    });

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

    prisma.forecast.deleteMany({
      where: { siteId },
    }),
    prisma.forecast.createMany({ data: forecast }),
  ]);
  console.log(filteredObserved, forecast);
  return data;
}

(async () => await fetchWeather())();
