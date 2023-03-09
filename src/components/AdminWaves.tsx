import React from "react";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
// import router from "next/router";

interface Values {
  lat: number;
  lon: number;
  siteId: string;
}

function AdminWaves() {
  const waves = api.forecast.getSiteIds.useQuery();
  const [siteId, setSiteId] = useState<string>("");
  const latLon = api.admin.getLatLon.useQuery({ siteId });
  const changeLatLon = api.admin.updateLatLon.useMutation();
  const { handleSubmit, register, reset } = useForm<Values>();

  useEffect(() => {
    const defaultValues = { lat: latLon.data?.lat, lon: latLon.data?.lon };
    reset({ ...defaultValues });
  }, [reset, latLon.data?.lat, latLon.data?.lon]);

  function onSubmit(values: Values) {
    changeLatLon.mutate(values);
  }
  const unitOptions = waves?.data?.map((wave) => {
    return (
      <option key={wave.siteId} value={wave.siteId || ""}>
        {`${wave.siteName} - ${wave.siteId}`}
      </option>
    );
  });
  console.log(changeLatLon.error);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center gap-y-3"
      >
        <select
          className="select-accent select w-full max-w-xs"
          {...register("siteId", {
            onChange: (e) => {
              setSiteId(e.target.value);
            },
            required: true,
          })}
        >
          <option>Waves</option>
          {unitOptions}
        </select>
        <div>
          <div>
            <label>Latitude</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="0"
              {...register("lat", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>

          <div>
            <label>Longitude</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="0"
              {...register("lon", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>
        </div>
        {/* <p>{changeLatLon.isSuccess ? "data saved" : "error saving data"}</p> */}
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default AdminWaves;
