"use client";
import { useSearchParams } from "next/navigation";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { useMemo, useState, useCallback } from "react";

import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import useUsers from "@/production/Hooks/useUsers";
import Filters from "@/production/Dashboard/components/Filter/Filters";
import TableDashboard from "@/production/Dashboard/components/Tables/TableDashboard";
import AddUserModal from "@/production/Dashboard/components/Modals/AddProduct/AddProduct";
import UpdateUserModal from "@/production/Dashboard/components/Modals/UpdateUser/UpdateUser";
import { ResponseUpdateUserInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";
import ConfirmComponent from "@/production/Dashboard/components/Confirm/Confirm";

const CONDITIONS = { search: true, order: false };
const HEADERS = ["Nombre", "Email", "Roles", "Acciones"];
const COUNT_LIMIT = 1000;

const STYLES = {
  center: { textAlign: "center" as const, padding: "2rem" },
  button: {
    marginTop: "1rem",
    padding: "8px 16px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer" as const,
  },
  error: {
    color: "white",
    padding: "8px",
    marginBottom: "1rem",
    backgroundColor: "red",
    borderRadius: "4px",
  },
} as const;

const LoadingState = () => (
  <div style={STYLES.center}>
    <p style={{ color: "#bbbbbb" }}>Cargando usuarios...</p>
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: any;
  onRetry: () => void;
}) => (
  <div style={STYLES.center}>
    <p style={{ color: "red" }}>
      Error al cargar usuarios: {error?.message || "Error desconocido"}
    </p>
    <button
      onClick={onRetry}
      style={{ ...STYLES.button, backgroundColor: "red" }}
    >
      Reintentar
    </button>
  </div>
);

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div style={STYLES.center}>
    <p>No hay usuarios registrados</p>
    <button onClick={onAdd} style={STYLES.button}>
      Agregar primer usuario
    </button>
  </div>
);

const NoResultsState = ({
  searchName,
  onClear,
}: {
  searchName: string;
  onClear: () => void;
}) => (
  <div style={STYLES.center}>
    <p>No se encontraron usuarios con el nombre {searchName}</p>
    <button onClick={onClear} style={STYLES.button}>
      Limpiar búsqueda
    </button>
  </div>
);

function DashboardUsuarios() {
  const searchParams = useSearchParams();
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedUserData, setSelectedUserData] =
    useState<ResponseUpdateUserInterface>({
      id: "",
      email: "",
      name: "",
    });

  const filter = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const { users, deleteUser } = useUsers(undefined, {
    page: 1,
    limit: COUNT_LIMIT,
    ...filter,
  });

  const filteredUsers = useMemo(() => {
    if (!users.data?.users) return [];
    if (!searchName) return users.data.users;

    const search = searchName.toLowerCase();
    return users.data.users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
  }, [users.data?.users, searchName]);

  const handleAddUser = useCallback(() => setModalAddUser(true), []);
  const handleAddUserClose = useCallback(() => setModalAddUser(false), []);
  const handleUpdateUser = useCallback((data: ResponseUpdateUserInterface) => {
    setSelectedUserData({ ...data });
    setModalUpdateUser(true);
  }, []);
  const handleClearSearch = useCallback(() => setSearchName(""), []);

  const [openConfirm, setOpenConfirm] = useState<{ open: boolean; id: string }>(
    {
      open: false,
      id: "",
    }
  );

  const handleDeleteUser = useCallback((id: string) => {
    setOpenConfirm({ open: true, id });
  }, []);

  if (users.isLoading) {
    return (
      <StructureDashboard title="Usuarios">
        <LoadingState />
      </StructureDashboard>
    );
  }

  if (users.isError) {
    return (
      <StructureDashboard title="Usuarios">
        <ErrorState error={users.error} onRetry={users.refetch} />
      </StructureDashboard>
    );
  }

  const hasUsers = users.data?.users && users.data.users.length > 0;
  const hasSearchResults = filteredUsers.length > 0;
  const isSearching = Boolean(searchName);

  if (!hasUsers) {
    return (
      <StructureDashboard title="Usuarios">
        <Filters
          {...CONDITIONS}
          searchName={searchName}
          setSearchName={setSearchName}
          onAddResource={handleAddUser}
          nameResource="Usuario"
        />
        <EmptyState onAdd={handleAddUser} />
        {modalAddUser && <AddUserModal onClose={handleAddUserClose} />}
      </StructureDashboard>
    );
  }

  return (
    <StructureDashboard title="Usuarios">
      <Filters
        {...CONDITIONS}
        searchName={searchName}
        setSearchName={setSearchName}
        onAddResource={handleAddUser}
        nameResource="Usuario"
      />

      {deleteUser.isError && (
        <div style={STYLES.error}>
          Error al eliminar usuario:{" "}
          {deleteUser.error?.message || "Error desconocido"}
        </div>
      )}

      {isSearching && !hasSearchResults ? (
        <NoResultsState searchName={searchName} onClear={handleClearSearch} />
      ) : (
        <TableDashboard
          headers={HEADERS}
          rows={filteredUsers.map((user, index) => (
            <tr key={index} className="table-row">
              <td className="row-data">{user.name}</td>
              <td className="row-data">{user.email}</td>
              <td className="row-data">
                {user.roles?.[0]?.role.name || "Sin Rol"}
              </td>
              <td className="update-delete">
                <div
                  className="icono"
                  onClick={() => handleUpdateUser({ ...user })}
                >
                  <GoPencil className="icon" />
                </div>
                <div
                  className="icono"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <CiTrash className="icon" />
                </div>
              </td>
            </tr>
          ))}
        />
      )}

      {modalAddUser && <AddUserModal onClose={handleAddUserClose} />}
      {modalUpdateUser && (
        <UpdateUserModal
          onClose={() => setModalUpdateUser(false)}
          userData={selectedUserData}
        />
      )}
      {openConfirm.open && (
        <ConfirmComponent
          title="Eliminar usuario"
          message="¿Estás seguro de eliminar este usuario?"
          onConfirm={() => {
            deleteUser.mutate(openConfirm.id);
            setOpenConfirm({ open: false, id: "" });
          }}
          onCancel={() => setOpenConfirm({ open: false, id: "" })}
          isOpen={openConfirm.open}
          {...openConfirm}
        />
      )}
    </StructureDashboard>
  );
}

export default DashboardUsuarios;
