import type { Handler } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import fetchRiverData from "../../src/scripts/update-wave";
// import fetchRiverDataNoForecast from "../../src/scripts/update-wave-no-forecast";

const reportHandler: Handler = async () => {
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

  // await fetchRiverDataNoForecast(
  //   "14070500",
  //   "Green Wave",
  //   "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=debo3&output=xml"
  // );

  return {
    statusCode: 200,
  };
};

const handler = schedule("31 * * * *", reportHandler);

export { handler };
