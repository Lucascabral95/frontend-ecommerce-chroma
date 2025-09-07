import React from "react";

import "./ProductById.scss";

interface Props {
  detail: string;
}

function ProductByIdLoading({ detail }: Props) {
  return (
    <div className="product-by-id-loading">
      <p>Cargando {detail}...</p>
    </div>
  );
}

export default ProductByIdLoading;
