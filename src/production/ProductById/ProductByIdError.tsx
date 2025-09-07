import React from "react";
import SectionStructure from "@/production/Section/SectionStructure";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

import "./ProductById.scss";

interface Props {
  title: string;
  description: string;
}

function ProductByIdError({ title, description }: Props) {
  return (
    <SectionStructure>
      <div className="product-by-id-error">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href="/" className="link">
          Volver al Inicio
        </Link>
      </div>
    </SectionStructure>
  );
}

export default ProductByIdError;
