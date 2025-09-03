import React from "react";
import SectionStructure from "@/production/Section/SectionStructure";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

import "./ProductById.scss";

function ProductByIdError() {
  return (
    <SectionStructure>
      <div className="product-by-id-error">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h2>Error al Cargar el Producto</h2>
        <p>
          Lo sentimos, no pudimos encontrar el producto que buscas. Por favor,
          revisa la URL o intenta de nuevo.
        </p>
        <Link href="/" className="link">
          Volver al Inicio
        </Link>
      </div>
    </SectionStructure>
  );
}

export default ProductByIdError;
