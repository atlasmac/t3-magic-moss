import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import fetchLochsa from "../../src/scripts/update-lochsa";

const lochsaHandler: Handler = async () => {
  await fetchLochsa();

  return {
    statusCode: 200,
  };
};

const handler = schedule("1 * * * *", lochsaHandler);

export { handler };
