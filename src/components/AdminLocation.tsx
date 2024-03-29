import { useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  siteId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}
interface Values {
  lat: number;
  lon: number;
  siteId: string;
  location: string;
}

function AdminLocation({ siteId, setShow }: Props) {
  const location = api.admin.getLocation.useQuery({ siteId });
  const changelocation = api.admin.updateLocation.useMutation({
    onSuccess: () => {
      setShow(true);
    },
  });
  const { handleSubmit, register, reset } = useForm<Values>();

  useEffect(() => {
    const defaultValues = {
      lat: location.data?.lat || 0,
      lon: location.data?.lon || 0,
      location: location.data?.location || "",
    };
    reset({ ...defaultValues });
  }, [reset, location.data, siteId]);

  function onSubmit(values: Values) {
    values.siteId = siteId;
    changelocation.mutate(values);
  }
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-y-3"
        >
          <div>
            <div className="mt-2 flex flex-col gap-y-2">
              <label className="font-bold">Latitude</label>
              <input
                className="input-bordered input-primary input h-9 w-full"
                placeholder="0"
                {...register("lat", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>

            <div className="mt-2 flex flex-col gap-y-2">
              <label className="font-bold">Longitude</label>
              <input
                className="input-bordered input-primary input h-9 w-full"
                placeholder="0"
                {...register("lon", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>

            <div className="mt-2 flex flex-col gap-y-2">
              <label className="font-bold">Location</label>
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
    </>
  );
}

export default AdminLocation;
