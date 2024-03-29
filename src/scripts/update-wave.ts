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

  if (
    data.site.observed[0] ===
    "There Is No Displayable Observation Data In The Given Time Frame"
  ) {
    console.log(
      `${siteId} ${siteName} is not available: ${data.site.observed[0]} - NOAA`
    );
    return;
  }
  const observed = data.site.observed[0]?.datum
    ?.map((a: any) => {
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

  const forecast = data.site.forecast[0]?.datum
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
  return data;
}

const main = async () => {
  await fetchRiverData(
    "12340000",
    "The Ledge",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=bonm8&output=xml"
  );
  await fetchRiverData(
    "12340500",
    "Brennan's Wave",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=abom8&output=xml"
  );
  await fetchRiverData(
    "12354500",
    "Zero Wave",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=srgm8&output=xml"
  );
  await fetchRiverData(
    "13337000",
    "Lochsa's Pipeline",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=loci1&output=xml"
  );
  await fetchRiverData(
    "13302500",
    "Salmon Whitewater Park",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=smni1&output=xml"
  );
  await fetchRiverData(
    "13022500",
    "Lunch Counter",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=alpw4&output=xml",
    1000
  );
  await fetchRiverData(
    "06192500",
    "Springdale",
    "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=livm8&output=xml",
    1000
  );
};

main();
