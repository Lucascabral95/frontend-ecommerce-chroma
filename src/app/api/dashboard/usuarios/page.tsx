"use client";
import { useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";

import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import useUsers from "@/production/Hooks/useUsers";
import Filters from "@/production/Dashboard/components/Filter/Filters";
import TableDashboard from "@/production/Dashboard/components/Tables/TableDashboard";
import AddUserModal from "@/production/Dashboard/components/Modals/AddProduct/AddProduct";
import UpdateUserModal from "@/production/Dashboard/components/Modals/UpdateUser/UpdateUser";
import { ResponseUpdateUserInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";
import ConfirmComponent from "@/production/Dashboard/components/Confirm/Confirm";
import LoadingState from "@/production/Dashboard/components/shared/LoadingState";
import ErrorState from "@/production/Dashboard/components/shared/ErrorState";
import EmptyState from "@/production/Dashboard/components/shared/EmptyState";
import NoResultsState from "@/production/Dashboard/components/shared/NoResultsState";

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

function DashboardUsuariosContent() {
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

  const [openConfirm, setOpenConfirm] = useState<{ open: boolean; id: string }>(
    {
      open: false,
      id: "",
    }
  );

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

  const handleUpdateUserClose = useCallback(() => {
    setModalUpdateUser(false);
    setSelectedUserData({ id: "", email: "", name: "" });
  }, []);

  const handleClearSearch = useCallback(() => setSearchName(""), []);

  const handleDeleteUser = useCallback((id: string) => {
    setOpenConfirm({ open: true, id });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    deleteUser.mutate(openConfirm.id);
    setOpenConfirm({ open: false, id: "" });
  }, [deleteUser, openConfirm.id]);

  const handleCancelDelete = useCallback(() => {
    setOpenConfirm({ open: false, id: "" });
  }, []);

  const tableRows = useMemo(() => {
    if (!filteredUsers.length) return [];

    return filteredUsers.map((user) => (
      <tr key={user.id || user.email} className="table-row">
        <td className="row-data">{user.name}</td>
        <td className="row-data">{user.email}</td>
        <td className="row-data">{user.roles?.[0]?.role.name || "Sin Rol"}</td>
        <td className="update-delete">
          <button
            type="button"
            className="icono"
            onClick={() => handleUpdateUser({ ...user })}
            aria-label={`Editar usuario ${user.name}`}
          >
            <GoPencil className="icon" />
          </button>
          <button
            type="button"
            className="icono"
            onClick={() => handleDeleteUser(user.id)}
            aria-label={`Eliminar usuario ${user.name}`}
          >
            <CiTrash className="icon" />
          </button>
        </td>
      </tr>
    ));
  }, [filteredUsers, handleUpdateUser, handleDeleteUser]);

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
        <NoResultsState searchTerm={searchName} onClear={handleClearSearch} />
      ) : (
        <TableDashboard headers={HEADERS} rows={tableRows} />
      )}

      {modalAddUser && <AddUserModal onClose={handleAddUserClose} />}
      {modalUpdateUser && (
        <UpdateUserModal
          onClose={handleUpdateUserClose}
          userData={selectedUserData}
        />
      )}
      {openConfirm.open && (
        <ConfirmComponent
          title="Eliminar usuario"
          message="¿Estás seguro de eliminar este usuario?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isOpen={openConfirm.open}
        />
      )}
    </StructureDashboard>
  );
}

function DashboardUsuarios() {
  return (
    <Suspense fallback={<LoadingState />}>
      <DashboardUsuariosContent />
    </Suspense>
  );
}

export default DashboardUsuarios;
