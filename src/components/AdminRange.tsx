import { useEffect } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  siteId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}
interface Values {
  bottomRange: number;
  topRange: number;
  siteId: string;
}

function AdminLocation({ siteId, setShow }: Props) {
  const range = api.admin.getRange.useQuery({ siteId });
  const changeRange = api.admin.updateRange.useMutation({
    onSuccess: () => {
      setShow(true);
    },
  });
  const { handleSubmit, register, reset } = useForm<Values>();

  useEffect(() => {
    const defaultValues = {
      bottomRange: range.data?.bottomRange || 0,
      topRange: range.data?.topRange || 0,
    };
    reset({ ...defaultValues });
  }, [reset, range.data, siteId]);

  function onSubmit(values: Values) {
    values.siteId = siteId;
    changeRange.mutate(values);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-y-3"
      >
        <div>
          <div className="mt-2 flex flex-col gap-y-2">
            <label className="font-bold">Bottom range cfs</label>
            <input
              className="input-bordered input-primary input h-9 w-full"
              placeholder="0"
              {...register("bottomRange", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>

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
