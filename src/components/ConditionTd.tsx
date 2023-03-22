import React from "react";
import { api } from "../utils/api";

interface Props {
  cfs: number;
  siteId: string;
}

function ConditionTd({ cfs, siteId }: Props) {
  const { data } = api.admin.getCurrentCondition.useQuery({
    siteId: siteId,
    currentCfs: cfs,
  });
  return <td>{data?.condition || "TBD"}</td>;
}

export default ConditionTd;
