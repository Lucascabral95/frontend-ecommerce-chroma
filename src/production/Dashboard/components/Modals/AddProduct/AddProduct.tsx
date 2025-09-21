"use client";
import { FormEvent, useState } from "react";

import StructureModal from "../StructureModal";
import { RegisterUserInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";
import useUsers from "@/production/Hooks/useUsers";

interface Props {
  onClose: () => void;
}

function AddUserModal({ onClose }: Props) {
  const [dataUser, setDataUser] = useState<RegisterUserInterface>({
    name: "",
    email: "",
    hashedPassword: "",
  });

  const { newUser } = useUsers();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dataUser.name || !dataUser.email || !dataUser.hashedPassword) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (dataUser.hashedPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    newUser.mutate(dataUser, {
      onSuccess: () => {
        setDataUser({
          name: "",
          email: "",
          hashedPassword: "",
        });
        onClose();
      },
      onError: (error) => {
        console.error("Error al crear el usuario:", error);
        alert("Ocurrió un error al crear el usuario");
      },
    });
  };

  return (
    <StructureModal title="Agregar Usuario" close={() => onClose()}>
      <form onSubmit={submit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            value={dataUser.name}
            required
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
            required
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="hashedPassword">Password</label>
          <input
            type="password"
            id="hashedPassword"
            name="hashedPassword"
            placeholder="Ingrese el password"
            value={dataUser.hashedPassword}
            required
            onChange={(e) =>
              setDataUser({ ...dataUser, hashedPassword: e.target.value })
            }
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </StructureModal>
  );
}

export default AddUserModal;
