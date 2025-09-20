"use client";
import { useSearchParams } from "next/navigation";

import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import useUsers from "@/production/Hooks/useUsers";
import Table from "@/production/Table/Table";

function DashboardUsuarios() {
  const { users } = useUsers();
  const searchParams = useSearchParams();

  const filter = Object.fromEntries(searchParams);

  return (
    <StructureDashboard title="Usuarios">
      <Table
        data={users.data?.users ?? []}
        headers={["ID", "Nombre", "Email"]}
        renderRow={(item) => (
          <tr key={item.id}>
            <td> {item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        )}
      />
    </StructureDashboard>
  );
}

export default DashboardUsuarios;
