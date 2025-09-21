"use client";
import { FormEvent, useState } from "react";

import StructureModal from "../StructureModal";
import { UpdateUserDtoInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";
import useUsers from "@/production/Hooks/useUsers";
import { ResponseUpdateUserInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";

interface Props {
  onClose: () => void;
  userData: ResponseUpdateUserInterface;
}

function UpdateUserModal({ onClose, userData }: Props) {
  const initialData: UpdateUserDtoInterface = {
    name: userData.name,
    email: userData.email,
  };

  const [dataUser, setDataUser] = useState<UpdateUserDtoInterface>(initialData);
  const { updateUser } = useUsers();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser.mutate(
      { id: userData.id, user: dataUser },
      {
        onSuccess: () => {
          setDataUser(initialData);
          onClose();
        },
        onError: (error) => {
          console.error("Error al actualizar el usuario:", error);
          alert("Ocurrió un error al actualizar el usuario");
        },
      }
    );
  };

  return (
    <StructureModal title="Actualizar Usuario" close={() => onClose()}>
      <form onSubmit={(e) => submit(e)} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            value={dataUser.name}
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese el email"
            value={dataUser.email}
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </StructureModal>
  );
}

export default UpdateUserModal;
