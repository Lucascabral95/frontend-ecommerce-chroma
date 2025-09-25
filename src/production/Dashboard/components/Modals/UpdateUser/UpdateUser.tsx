"use client";
import {
  FormEvent,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import StructureModal from "../StructureModal";
import {
  UpdateUserDtoInterface,
  ResponseUpdateUserInterface,
} from "@/Insfraestructure/Interfaces/Users/Users.interface";
import useUsers from "@/production/Hooks/useUsers";

const TIMEOUT = 1600;

interface Props {
  onClose: () => void;
  userData: ResponseUpdateUserInterface;
}

function UpdateUserModal({ onClose, userData }: Props) {
  const initialData = useMemo<UpdateUserDtoInterface>(
    () => ({
      name: userData.name,
      email: userData.email,
    }),
    [userData.name, userData.email]
  );

  const { updateUser } = useUsers();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const updatedData: UpdateUserDtoInterface = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      };

      updateUser.mutate(
        { id: userData.id, user: updatedData },
        {
          onSuccess: () => {
            timeoutRef.current = setTimeout(() => {
              onClose();
            }, TIMEOUT);
          },
          onError: (error) => {
            console.error("Error al actualizar el usuario:", error);
          },
        }
      );
    },
    [updateUser, userData.id, onClose]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }, []);

  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <StructureModal title="Actualizar Usuario" close={handleClose}>
      <form onSubmit={handleSubmit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            defaultValue={initialData.name}
            disabled={updateUser.isPending}
            onKeyDown={handleKeyDown}
            required
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese el email"
            defaultValue={initialData.email}
            disabled={updateUser.isPending}
            onKeyDown={handleKeyDown}
            required
          />
        </div>

        {updateUser.isError && (
          <p style={{ color: "red" }}>Error al actualizar el usuario</p>
        )}

        <button
          style={{
            backgroundColor: updateUser.isSuccess ? "green" : "",
          }}
          type="submit"
          disabled={updateUser.isPending}
        >
          {updateUser.isSuccess
            ? "Actualizado"
            : updateUser.isPending
            ? "Actualizando..."
            : "Actualizar"}
        </button>
      </form>
    </StructureModal>
  );
}

export default UpdateUserModal;
