import type { Handler } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import fetchLochsa from "../../src/scripts/update-lochsa";
import fetchMissoula from "../../src/scripts/update-missoula";
import fetchLunchcounter from "../../src/scripts/update-lunchcounter";
import fetchZero from "../../src/scripts/update-zero";
import fetchSalmon from "../../src/scripts/update-salmon";

const reportHandler: Handler = async () => {
  await fetchLochsa();
  await fetchMissoula();
  await fetchLunchcounter();
  await fetchZero();
  await fetchSalmon();

  return {
    statusCode: 200,
  };
};

const handler = schedule("33 * * * *", reportHandler);

export { handler };
