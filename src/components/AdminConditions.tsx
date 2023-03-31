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
  reportDesc: string;
}
interface Condition {
  id?: string | undefined;
  cfs: number;
  condition: string;
  reportDesc: string;
}
type Conditions = Condition[] | undefined;

function AdminLocation({ siteId, setShow }: Props) {
  const [inputValues, setInputValues] = useState<Conditions>();
  const [newValues, setNewValues] = useState<NewValues>({
    cfs: 0,
    condition: "flat",
    reportDesc: "...",
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
    onError: () => {
      conditions.refetch();
    },
  });

  useEffect(() => {
    conditions.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  const handleSubmit = (con: Conditions) => {
    if (newValues.condition && newValues.cfs && con) {
      con?.push(newValues);
      if (con) conditionsMutate.mutate({ siteId, conditions: con });
      setNewValues({ cfs: 0, condition: newValues.condition, reportDesc: "" });
    } else if (con) {
      conditionsMutate.mutate({ siteId, conditions: con });
    }
  };

  const options = [
    { value: "flat", label: "flat" },
    { value: "poor", label: "poor" },
    { value: "fair", label: "fair" },
    { value: "good", label: "good" },
    { value: "great", label: "great" },
  ];
  const conditionOptions = options.map((wave) => {
    return (
      <option key={wave.value} value={wave.value}>
        {wave.label}
      </option>
    );
  });

  const editInputs = inputValues?.map((vals, i, r) => {
    const cfsBelow = i === 0 ? "0" : r[i - 1]?.cfs;

    const cfs = vals.cfs;

    return (
      <div key={vals.id || i} className="mt-2 flex flex-col gap-y-2">
        <div className="flex w-full flex-row justify-between">
          <label className="font-bold text-slate-900">{`Conditions from ${
            cfsBelow || "?"
          } - ${cfs || "?"} cfs`}</label>
          <BsTrash
            className="text-lg text-slate-900 hover:text-red-600"
            onClick={() => deleteCondition.mutate({ id: vals.id || "" })}
          >
            Delete
          </BsTrash>
        </div>

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
        <select
          className="select-primary select w-full max-w-xs"
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
        >
          {conditionOptions}
        </select>
        <textarea
          className="textarea-primary textarea"
          placeholder="Bio"
          value={vals.reportDesc || ""}
          onChange={(e) => {
            const values = {
              ...vals,
              reportDesc: e.target.value,
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
        ></textarea>
      </div>
    );
  });

  return (
    <div>
      <div className="my-6 max-h-[500px] overflow-y-auto rounded bg-slate-400 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(inputValues);
          }}
          className="flex flex-col justify-center gap-y-3"
        >
          <div>{editInputs}</div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold text-slate-900">
              Add condition data
            </label>
            <input
              type="number"
              value={newValues?.cfs}
              placeholder={"Add cfs"}
              onChange={(e) => {
                const value = {
                  condition: newValues?.condition,
                  cfs: e.target.valueAsNumber,
                  reportDesc: newValues?.reportDesc,
                };
                setNewValues(value);
              }}
              className="input-bordered input-primary input h-9 w-full"
            />
            <select
              className="select-primary select w-full max-w-xs"
              value={newValues?.condition}
              onChange={(e) => {
                const value = {
                  cfs: newValues?.cfs,
                  condition: e.target.value,
                  reportDesc: newValues?.reportDesc,
                };
                setNewValues(value);
              }}
            >
              {conditionOptions}
            </select>
            <textarea
              className="textarea-primary textarea"
              placeholder="Enter detailed report"
              value={newValues?.reportDesc || ""}
              onChange={(e) => {
                const value = {
                  condition: newValues?.condition,
                  cfs: newValues?.cfs,
                  reportDesc: e.target.value,
                };
                setNewValues(value);
              }}
            ></textarea>
          </div>
          <button type="submit" className="btn">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLocation;
