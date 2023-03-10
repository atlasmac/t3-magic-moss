import { useState } from "react";
import { api } from "../utils/api";
import AdminLocation from "./AdminLocation";
// import router from "next/router";

function AdminWaves() {
  const waves = api.forecast.getSiteIds.useQuery();
  const [siteId, setSiteId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  console.log(value, "value");
  const unitOptions = waves?.data?.map((wave) => {
    return (
      <option key={wave.siteId} value={wave.siteId || ""}>
        {`${wave.siteName} - ${wave.siteId}`}
      </option>
    );
  });
  return (
    <div>
      <select
        className="select-accent select w-full max-w-xs"
        onChange={(e) => {
          setSiteId(e.target.value);
        }}
      >
        <option>Waves</option>
        {unitOptions}
      </select>
      {siteId && (
        <>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Location</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                checked={value === "1"}
                onClick={(e) => {
                  setValue("1");
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Range</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                value={2}
                checked={value === "2"}
                onClick={() => {
                  setValue("2");
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Gif</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-green-500"
                checked={value === "3"}
                onClick={() => {
                  setValue("3");
                }}
              />
            </label>
          </div>
          {value === "1" && <AdminLocation siteId={siteId} />}
        </>
      )}
    </div>
  );
}

export default AdminWaves;
