import { useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";

interface Props {
  siteId: string;
}
interface Values {
  giph: string;
  siteId: string;
}

function AdminLocation({ siteId }: Props) {
  const giph = api.admin.getGiph.useQuery({ siteId });
  const changeGiph = api.admin.updateGiph.useMutation();
  const { handleSubmit, register, reset } = useForm<Values>();

  useEffect(() => {
    const defaultValues = {
      giph: giph.data?.giph || "...",
    };
    reset({ ...defaultValues });
  }, [reset, giph.data?.giph, giph.data]);

  function onSubmit(values: Values) {
    values.siteId = siteId;
    changeGiph.mutate(values);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-y-3"
      >
        <div>
          <div className="mt-2 flex flex-col gap-y-2">
            <label className="font-bold">Gif url</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="enter url"
              {...register("giph", {
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

export default AdminLocation;
