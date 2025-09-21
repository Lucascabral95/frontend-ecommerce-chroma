"use client";
import useUsers from "@/production/Hooks/useUsers";
import StructureModal from "../Modals/StructureModal";
import { RegisterUserInterface } from "@/Insfraestructure/Interfaces/Users/Users.interface";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

function FormInputComponent({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="form-input-group">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
  );
}

function AddUserModal({ open, onClose }: AddUserModalProps) {
  const { newUser } = useUsers();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData: RegisterUserInterface = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      hashedPassword: formData.get("hashedPassword") as string,
    };

    if (!userData.name?.trim()) {
      alert("El nombre es requerido");
      return;
    }

    if (!userData.email?.trim()) {
      alert("El email es requerido");
      return;
    }

    if (!userData.hashedPassword) {
      alert("La contraseña es requerida");
      return;
    }

    if (userData.hashedPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await newUser.mutateAsync(userData);
      onClose();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Ocurrió un error al crear el usuario");
    }
  };

  return (
    <StructureModal title="Agregar Usuario" close={() => onClose()}>
      <form onSubmit={submit} className="form-inside">
        <FormInputComponent
          label="Nombre"
          name="name"
          type="text"
          placeholder="Ingrese el nombre"
        />
        <FormInputComponent
          label="Email"
          name="email"
          type="email"
          placeholder="Ingrese el email"
        />
        <FormInputComponent
          label="Password"
          name="hashedPassword"
          type="password"
          placeholder="Ingrese el password"
        />
        <button type="submit">Agregar</button>
      </form>
    </StructureModal>
  );
}

export default AddUserModal;
