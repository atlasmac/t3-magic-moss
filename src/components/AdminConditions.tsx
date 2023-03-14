import router from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface Props {
  siteId: string;
}

type Conditions =
  | {
      id?: string | undefined;
      cfs: number;
      condition: string;
    }[]
  | undefined;

function AdminLocation({ siteId }: Props) {
  const [inputValues, setInputValues] = useState<Conditions>();
  const conditions = api.admin.getRiverConditions.useQuery({ siteId });
  const conditionsMutate = api.admin.updateRiverConditions.useMutation();

  useEffect(() => {
    setInputValues(conditions.data);
  }, [conditions.data]);

  const handleSubmit = (conditions: Conditions) => {
    if (conditions) conditionsMutate.mutate({ siteId, conditions });
    router.reload();
  };

  const editInputs = inputValues?.map((vals) => {
    return (
      <div key={vals.id} className="mt-2 flex flex-col gap-y-2">
        <label className="font-bold">{`Conditions up to ${vals.cfs} cfs`}</label>
        <input
          type="number"
          value={vals.cfs}
          onChange={(e) => {
            const values = {
              ...vals,
              cfs: e.target.valueAsNumber,
            };
            setInputValues(
              inputValues.map((e) => {
                if (e.id === vals.id) {
                  return values;
                }
                return e;
              })
            );
          }}
          className="input-bordered input-primary input h-9 w-full"
        />
        <input
          value={vals.condition}
          onChange={(e) => {
            const values = {
              ...vals,
              condition: e.target.value,
            };
            setInputValues(
              inputValues.map((e) => {
                if (e.id === vals.id) {
                  return values;
                }
                return e;
              })
            );
          }}
          className="input-bordered input-primary input h-9 w-full"
        />
      </div>
    );
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputValues);
        }}
        className="flex flex-col justify-center gap-y-3"
      >
        <div>{editInputs}</div>
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default AdminLocation;
