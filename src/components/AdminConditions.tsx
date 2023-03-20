import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { BsTrash } from "react-icons/bs";

interface Props {
  siteId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
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

function AdminLocation({ siteId, setShow }: Props) {
  const [conditionId, setConditionId] = useState<string>();
  console.log(conditionId);
  const [inputValues, setInputValues] = useState<Conditions>();
  const [newValues, setNewValues] = useState<NewValues>({
    cfs: 0,
    condition: "",
  });

  const deleteCondition = api.admin.deleteCondition.useMutation({
    onSuccess: () => {
      conditions.refetch();
    },
  });
  const conditions = api.admin.getRiverConditions.useQuery(
    { siteId },
    {
      enabled: false,
      onSuccess: (data) => {
        setInputValues(data);
      },
    }
  );
  const conditionsMutate = api.admin.updateRiverConditions.useMutation({
    onSuccess: () => {
      setShow(true);
      conditions.refetch();
    },
  });

  useEffect(() => {
    conditions.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const editInputs = inputValues?.map((vals, i, r) => {
    const cfsBelow = i === 0 ? "0" : r[i - 1]?.cfs;

    const cfs = vals.cfs;
    // const input
    return (
      <div key={vals.id} className="mt-2 flex flex-col gap-y-2">
        <label className="font-bold">{`Conditions from ${cfsBelow || "?"} - ${
          cfs || "?"
        } cfs`}</label>
        <input
          type="number"
          placeholder="Enter a number"
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
          placeholder="Enter a condition"
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
        <div className="w-full">
          <BsTrash
            onClick={() => deleteCondition.mutate({ id: vals.id || "" })}
          >
            Delete
          </BsTrash>
        </div>
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
