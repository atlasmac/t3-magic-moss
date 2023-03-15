import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
// import router from "next/router";

interface Values {
  lat: number;
  lon: number;
  siteId: string;
  location: string;
}

function AdminWaves() {
  const waves = api.forecast.getSiteIds.useQuery();
  const [siteId, setSiteId] = useState<string>("");
  const location = api.admin.getLocation.useQuery({ siteId });
  const changelocation = api.admin.updateLocation.useMutation();
  const { handleSubmit, register, reset } = useForm<Values>();

  useEffect(() => {
    const defaultValues = {
      lat: location.data?.lat,
      lon: location.data?.lon,
      location: location.data?.location || "",
    };
    reset({ ...defaultValues });
  }, [reset, location.data?.lat, location.data?.lon, location.data?.location]);

  function onSubmit(values: Values) {
    changelocation.mutate(values);
  }
  const unitOptions = waves?.data?.map((wave) => {
    return (
      <option key={wave.siteId} value={wave.siteId || ""}>
        {`${wave.siteName} - ${wave.siteId}`}
      </option>
    );
  });
  console.log(changelocation.error);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-y-3"
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

          <div>
            <label>Location</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder=""
              {...register("location", {
                required: true,
              })}
            />
          </div>
        </div>
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default AdminWaves;
