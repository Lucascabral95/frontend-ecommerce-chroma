"use client";
import { FormEvent, useState } from "react";

import StructureModal from "../StructureModal";
import useProducts from "@/production/Hooks/useProducts";
import {
  CreateProduct,
  ProductStatusString,
} from "@/Insfraestructure/Interfaces/products/product.interface";

const TIMEOUT_TOAST = 1600;

interface Props {
  onClose: () => void;
}

function AddNewProduct({ onClose }: Props) {
  const [dataProduct, setDataProduct] = useState<CreateProduct>({
    name: "",
    description: "",
    basePrice: 0,
    status: ProductStatusString.ACTIVE,
  });

  const { createProduct } = useProducts();
  const [success, setSuccess] = useState<boolean>(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !dataProduct.name ||
      !dataProduct.description ||
      !dataProduct.basePrice
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (dataProduct.basePrice < 0) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    createProduct.mutate(dataProduct, {
      onSuccess: () => {
        setDataProduct({
          name: "",
          description: "",
          basePrice: 0,
          status: ProductStatusString.ACTIVE,
        });
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, TIMEOUT_TOAST);
      },
      onError: (error) => {
        console.error("Error al crear el usuario:", error);
        alert("Ocurrió un error al crear el usuario");
      },
    });
  };

  return (
    <StructureModal title="Crear Producto" close={() => onClose()}>
      <form onSubmit={submit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            value={dataProduct.name}
            required
            onChange={(e) =>
              setDataProduct({ ...dataProduct, name: e.target.value })
            }
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Ingrese la descripción"
            value={dataProduct.description}
            required
            onChange={(e) =>
              setDataProduct({ ...dataProduct, description: e.target.value })
            }
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="basePrice">Precio Base</label>
          <input
            type="number"
            id="basePrice"
            name="basePrice"
            placeholder="Ingrese el precio base"
            value={dataProduct.basePrice}
            required
            onChange={(e) =>
              setDataProduct({
                ...dataProduct,
                basePrice: parseInt(e.target.value),
              })
            }
          />
        </div>
        <button type="submit" className={success ? "button-success" : ""}>
          {success ? "Creado" : "Agregar"}
        </button>
      </form>
    </StructureModal>
  );
}

export default AddNewProduct;
