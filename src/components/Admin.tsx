import { useState } from "react";
import { api } from "../utils/api";

function Admin() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const users = api.admin.getAllUsers.useQuery();

  const unitOptions = users?.data?.map((user) => {
    return (
      <option key={user.email} value={user.email || ""}>
        {`${user.name} - ${user.email}`}
      </option>
    );
  });
  return (
    <div>
      <select
        className="select-accent select w-full max-w-xs"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option>Users</option>
        {unitOptions}
      </select>
      ;
    </div>
  );
}

export default Admin;
