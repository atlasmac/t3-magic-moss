import { useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";

interface Props {
  siteId: string;
}
// interface Values {}

function AdminLocation({ siteId }: Props) {
  const conditions = api.admin.getRiverConditions.useQuery({ siteId });

  // const { handleSubmit, register, reset } = useForm<Values>();

  const editInputs = conditions.data
    ?.sort((a, b) => a.cfs - b.cfs)
    .map((e) => {
      return (
        <div key={e.id} className="mt-2 flex flex-col gap-y-2">
          <label className="font-bold">{`Conditions up to ${e.cfs} cfs`}</label>
          <input
            value={e.cfs}
            className="input-bordered input-primary input h-9 w-full"
          />
          <input
            value={e.condition}
            className="input-bordered input-primary input h-9 w-full"
          />
        </div>
      );
    });

  // function onSubmit(values: Values) {}
  return (
    <div>
      <form
        // onSubmit={}
        className="flex flex-col justify-center gap-y-3"
      >
        <div>
          {editInputs}
          {/* <div className="mt-2 flex flex-col gap-y-2">
            <label className="font-bold">Bottom range cfs</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="0"
              {...register("bottomRange", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div> */}
          {/* 
          <div className="mt-2 flex flex-col gap-y-2">
            <label className="font-bold">Top range cfs</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="0"
              {...register("topRange", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div> */}
        </div>
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default AdminLocation;
