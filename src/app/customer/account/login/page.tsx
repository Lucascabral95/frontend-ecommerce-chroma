"use client";
import React, { useState } from "react";

import SectionStructure from "@/production/Section/SectionStructure";
import { TbShoppingCartCheck } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import { Errors } from "@/Insfraestructure/Interfaces/Errors/Errors";

import { z } from "zod";
import useAuthStore from "@/lib/zustand/AuthZustand";
import { useRouter } from "next/navigation";
import Toast from "@/Shared/Components/Toast";

import "./login.scss";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

interface Benefits {
  icon: React.ReactNode;
  detail: string;
}

const TIME_TO_CLOSE_TOAST = 1800;

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [toastMessage, setToastMessage] = useState({
    message: "",
    error: false,
  });
  const router = useRouter();

  const useData = useSEO({
    title: "Iniciar sesión - Chroma",
    description: "Iniciar sesión - Chroma",
    path: `/customer/account/login`,
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "iniciar sesión, login, Chroma, inicio de sesión, sesión iniciada, sesión no iniciada, sesión no autenticada, sesión autenticada, sesión no autorizada, sesión autorizada",
    type: "website",
  });

  const { setJwt } = useAuthStore();

  const loginSchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  });

  const benefits: Benefits[] = [
    {
      icon: <TbShoppingCartCheck className="icon" />,
      detail: "Carrito más rápido",
    },
    { icon: <FaRegSave className="icon" />, detail: "Datos guardados" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    setEmailError("");

    const result = loginSchema.safeParse({ email });

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setEmailError(fieldErrors.email?.[0] ?? "");
      return;
    }

    try {
      const res = await loginUser({
        email: email,
        hashedPassword: password,
      });

      setEmail("");
      setPassword("");
      setJwt(res.accessToken);

      setToastMessage({ message: "Inicio de sesión exitoso", error: false });

      setTimeout(() => {
        setToastMessage({ message: "", error: false });
        router.push("/");
      }, TIME_TO_CLOSE_TOAST);
    } catch (e) {
      console.log(e);
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
        <div className="login">
          <div className="login__container">
            <div className="login">
              <h3> ¿Ya estás registrado? </h3>
              <p> Ingresá tus datos para iniciar sesión </p>
              <form className="formulario" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                    style={{ borderColor: emailError ? "red" : "" }}
                    type="email"
                    id="email"
                    placeholder="Ej. Ejemplo@mail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-text-error">• {emailError}</p>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                    style={{ borderColor: errors?.status ? "red" : "" }}
                    type="password"
                    id="password"
                    placeholder="Aa123456"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {errors?.status != null && (
                  <p style={{ color: "red" }}>
                    {errors.status} - {errors.message}
                  </p>
                )}

                <div className="form-control-button">
                  <button type="submit">INICIAR SESIÓN</button>
                </div>
              </form>
            </div>
            <div className="register">
              <h3> ¿No tenés cuenta? </h3>
              <p> ¡Registrarse es gratis y sencillo! </p>
              <div className="list-link">
                <ul className="list-benefits">
                  {benefits.map((benefit) => (
                    <li key={benefit.detail}>
                      <div className="icono">{benefit.icon}</div>
                      <p className="text-list-benefits">{benefit.detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="cont-link-register">
                  <Link
                    href="/customer/account/create"
                    className="link-register"
                  >
                    REGISTRARME
                  </Link>
                </div>
              </div>
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

export default Login;
