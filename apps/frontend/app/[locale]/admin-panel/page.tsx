"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoles } from "@/store/rolesSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function RolesList() {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, loading, error } = useSelector(
    (state: RootState) => state.roles
  );

  console.log("RolesList component rendered", roles);

  useEffect(() => {
    dispatch(fetchAllRoles());
  }, [dispatch]);

  if (loading) return <div>Loading roles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Roles and Permissions</h2>
      {roles.map((role) => (
        <div key={role?.role?.id} className="border p-4 mb-2">
          <h3>{role.role?.name}</h3>
          <p>{role.role?.description}</p>
          <ul>
            {role.permissions.map((rp: any) => (
              <li key={rp.id}>{rp.permission.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
