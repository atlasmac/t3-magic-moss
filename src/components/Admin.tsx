import { useState } from "react";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import router from "next/router";

interface Admin {
  email: string;
  admin: boolean;
}

function Admin() {
  const { handleSubmit, register } = useForm<Admin>();
  const makeAdmin = api.admin.makeUserAdmin.useMutation();
  const removeAdmin = api.admin.removeAdmin.useMutation();
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
    <div className="flex flex-col items-center gap-y-5">
      <div>
        <button
          onClick={() => {
            setSeeAdmins(!seeAdmins);
          }}
          className="btn"
        >
          {seeAdmins ? "View non admins" : "View admins"}
        </button>
      </div>
      <select
        className="select-accent select w-full max-w-xs"
        {...register("email")}
      >
        <option>{seeAdmins ? "Admin users" : "Non admin users"}</option>
        {unitOptions}
      </select>
      <button onClick={handleSubmit(onSubmit)} className="btn">
        {seeAdmins ? "Remove Admin Status" : "Grant Admin Status"}
      </button>
    </div>
  );
}

export default Admin;
