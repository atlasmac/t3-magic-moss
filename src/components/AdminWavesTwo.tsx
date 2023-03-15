import { useState } from "react";
import { api } from "../utils/api";
import AdminConditions from "./AdminConditions";
import AdminLocation from "./AdminLocation";
import AdminMedia from "./AdminMedia";
import AdminRange from "./AdminRange";
import SnackBar from "./SnackBar";
// import router from "next/router";

function AdminWaves() {
  const [show, setShow] = useState<boolean>(false);
  const waves = api.forecast.getSiteIds.useQuery();
  const [siteId, setSiteId] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const unitOptions = waves?.data?.map((wave) => {
    return (
      <option key={wave.siteId} value={wave.siteId || ""}>
        {`${wave.siteName} - ${wave.siteId}`}
      </option>
    );
  });
  return (
    <div className="w-80">
      <select
        className="select-accent select w-full"
        onChange={(e) => {
          setSiteId(e.target.value);
        }}
      >
        <option value={""}>Waves</option>
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
                onClick={() => {
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
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Conditions</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-pink-500"
                checked={value === "4"}
                onClick={() => {
                  setValue("4");
                }}
              />
            </label>
          </div>
          {value === "1" && (
            <>
              <AdminLocation siteId={siteId} setShow={setShow} />
              <SnackBar setShow={setShow} show={show} />
            </>
          )}
          {value === "2" && (
            <>
              <AdminRange siteId={siteId} setShow={setShow} />
              <SnackBar setShow={setShow} show={show} />
            </>
          )}
          {value === "3" && (
            <>
              <AdminMedia siteId={siteId} setShow={setShow} />
              <SnackBar setShow={setShow} show={show} />
            </>
          )}
          {value === "4" && (
            <>
              <AdminConditions siteId={siteId} setShow={setShow} />
              <SnackBar setShow={setShow} show={show} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminWaves;
