"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./not-found.scss";

export default function NotFound() {
  const pathname = usePathname();

  const isApiRoute = pathname.includes("/api");

  return (
    <div
      className="not-found-container"
      style={{ height: isApiRoute ? "100vh" : "80vh" }}
    >
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="title">Página no encontrada</h1>
        <p className="description">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link href="/" className="back-home">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
