import type { Handler } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import fetchRiverData from "../../src/scripts/update-wave";

const reportHandler: Handler = async () => {
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

  return {
    statusCode: 200,
  };
};

const handler = schedule("33 * * * *", reportHandler);

export { handler };
