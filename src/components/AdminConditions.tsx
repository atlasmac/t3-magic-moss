import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface Props {
  siteId: string;
}
interface NewValues {
  cfs: number;
  condition: string;
}
interface Condition {
  id?: string | undefined;
  cfs: number;
  condition: string;
}
type Conditions = Condition[] | undefined;

function AdminLocation({ siteId }: Props) {
  const [inputValues, setInputValues] = useState<Conditions>();
  const [newValues, setNewValues] = useState<NewValues>({
    cfs: 0,
    condition: "",
  });

  const conditions = api.admin.getRiverConditions.useQuery({ siteId });
  const conditionsMutate = api.admin.updateRiverConditions.useMutation({
    // onSuccess: () => {
    //   void conditions.refetch();
    // },
  });

  // useEffect(() => {
  //   conditions.refetch();
  // });

  useEffect(() => {
    setInputValues(conditions.data);
  }, [conditions.data]);

  const handleSubmit = (con: Conditions) => {
    if (newValues.condition && newValues.cfs && con) {
      con?.push(newValues);
      conditionsMutate.mutate({ siteId, conditions: con });
      setNewValues({ cfs: 0, condition: "" });
    }
    if (con) {
      conditionsMutate.mutate({ siteId, conditions: con });
    }
  };

  const editInputs = inputValues?.map((vals) => {
    // const input
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
        <div className="flex flex-col gap-y-3">
          <label className="font-bold">Add condition data</label>
          <input
            type="number"
            value={newValues?.cfs}
            placeholder={"Add cfs"}
            onChange={(e) => {
              const value = {
                condition: newValues?.condition,
                cfs: e.target.valueAsNumber,
              };
              setNewValues(value);
            }}
            className="input-bordered input-primary input h-9 w-full"
          />
          <input
            value={newValues?.condition}
            placeholder={"condition"}
            onChange={(e) => {
              const value = {
                cfs: newValues?.cfs,
                condition: e.target.value,
              };
              setNewValues(value);
            }}
            className="input-bordered input-primary input h-9 w-full"
          />
        </div>
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default AdminLocation;
