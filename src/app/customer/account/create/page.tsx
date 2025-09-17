"use client";

import { z } from "zod";

import SectionStructure from "@/production/Section/SectionStructure";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { Errors } from "@/Insfraestructure/Interfaces/Errors/Errors";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

import Toast from "@/Shared/Components/Toast";
import "./create.scss";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

const TIME_TO_CLOSE_TOAST = 1800;

function CreateUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    error: false,
  });
  const router = useRouter();

  const useData = useSEO({
    title: "Crear cuenta - Chroma",
    description: "Crear cuenta - Chroma",
    path: `/customer/account/create`,
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "crear cuenta, registro, Chroma, registro de usuario, usuario registrado, usuario no registrado, usuario no autenticado, usuario autenticado, usuario no autorizado, usuario autorizado",
    type: "website",
  });

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorsPassword, setErrorsPassword] = useState<string[]>([]);
  const [errorName, setErrorName] = useState<string>("");

  const registerSchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .refine(
        (value) => {
          const words = value.trim().split(/\s+/);
          return words.length >= 2 && words.every((word) => word.length >= 2);
        },
        {
          message:
            "Debe contener al menos dos palabras con un mínimo de 2 letras cada una",
        }
      ),
  });

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    setErrorEmail("");
    setErrorsPassword([]);
    setErrorName("");

    const result = registerSchema.safeParse({ email, password, name });

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      setErrorEmail(fieldErrors.email?.[0] ?? "");
      setErrorsPassword(fieldErrors.password ?? []);
      setErrorName(fieldErrors.name?.[0] ?? "");
    }

    try {
      const res = await registerUser({ email, hashedPassword: password, name });

      if (res) {
        setEmail("");
        setPassword("");
        setName("");

        setToastMessage({ message: "Registro exitoso", error: false });

        setTimeout(() => {
          setToastMessage({ message: "", error: false });
          router.push("/customer/account/login");
        }, TIME_TO_CLOSE_TOAST);
      }
    } catch (e) {
      const err = e as Errors;
      setErrors(err);
      setToastMessage({ message: err.message, error: true });
      setTimeout(() => {
        setToastMessage({ message: "", error: false });
      }, TIME_TO_CLOSE_TOAST);
    }
  };

  return (
    <SectionStructure background="#F5F5F5">
      <>
        <SEO {...useData} />
        <div className="create">
          <div className="create__container">
            <div className="register">
              <h3> Crear cuenta </h3>
              <p> Datos personales </p>
              <form className="formulario" onSubmit={registerSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    style={{ borderColor: errorName ? "red" : "" }}
                    type="text"
                    id="name"
                    placeholder="Ej. Lucas Cabral"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errorName && (
                    <p className="text-text-error">• {errorName}</p>
                  )}
                </div>
                <div className="form-group-email-password">
                  <div className="form-group-email">
                    <label htmlFor="email">Email</label>
                    <input
                      style={{ borderColor: errorEmail ? "red" : "" }}
                      type="email"
                      id="email"
                      placeholder="Ej. Ejemplo@mail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorEmail && (
                      <p className="text-text-error">• {errorEmail}</p>
                    )}
                  </div>
                  <div className="form-group-email">
                    <label htmlFor="password">Password</label>
                    <input
                      style={{
                        borderColor: errorsPassword.length > 0 ? "red" : "",
                      }}
                      type="password"
                      id="password"
                      placeholder="Aa123456"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorsPassword.length > 0 && (
                      <div className="text-error">
                        {errorsPassword.map((error) => (
                          <p className="text-text-error" key={error}>
                            • {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {errors?.status != null && (
                  <p className="text-error">
                    {errors.status} - {errors.message}
                  </p>
                )}

                <div className="form-group-button">
                  <Link className="link-back" href="/customer/account/login">
                    <BsArrowLeftShort className="icon" />
                    <p> Volver al login </p>
                  </Link>
                  <button type="submit">CREAR CUENTA</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {toastMessage.message && (
          <Toast message={toastMessage.message} error={toastMessage.error} />
        )}
      </>
    </SectionStructure>
  );
}

export default CreateUser;
