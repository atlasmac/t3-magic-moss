import { useState } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import router from "next/router";
import SnackBar from "./SnackBar";

interface Admin {
  email: string;
  admin: boolean;
}

function Admin() {
  const [show, setShow] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<Admin>();
  const makeAdmin = api.admin.makeUserAdmin.useMutation({
    onSuccess: () => {
      setShow(false);
    },
  });
  const removeAdmin = api.admin.removeAdmin.useMutation({
    onSuccess: () => {
      setShow(false);
    },
  });
  const [seeAdmins, setSeeAdmins] = useState<boolean>(false);
  const users = api.admin.getAdmins.useQuery({ admin: seeAdmins });

  function onSubmit(values: Admin) {
    if (!seeAdmins) {
      makeAdmin.mutate(values);
    }
    if (seeAdmins) {
      removeAdmin.mutate(values);
    }
    router.reload();
  }

  const unitOptions = users?.data?.map((user) => {
    return (
      <option key={user.email} value={user.email || ""}>
        {`${user.name} - ${user.email}`}
      </option>
    );
  });
  return (
    <div className="flex w-80 flex-col items-center gap-y-5">
      <button
        onClick={() => {
          setSeeAdmins(!seeAdmins);
        }}
        className="btn w-full"
      >
        {seeAdmins ? "View non admins" : "View admins"}
      </button>

      <select
        className="select-accent select w-full max-w-xs"
        {...register("email")}
      >
        <option>{seeAdmins ? "Admin users" : "Non admin users"}</option>
        {unitOptions}
      </select>
      <button onClick={handleSubmit(onSubmit)} className="btn w-full">
        {seeAdmins ? "Remove Admin Status" : "Grant Admin Status"}
      </button>
      <SnackBar setShow={setShow} show={show} />
    </div>
  );
}

export default Admin;
