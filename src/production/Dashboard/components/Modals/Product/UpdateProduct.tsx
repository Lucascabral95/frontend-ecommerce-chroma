"use client";
import { FormEvent, useState } from "react";

import StructureModal from "../StructureModal";
import useProducts from "@/production/Hooks/useProducts";
import {
  Product,
  ProductStatusString,
  UpdateProduct,
} from "@/Insfraestructure/Interfaces/products/product.interface";

const TIMEOUT_TOAST = 1600;

interface Props {
  onClose: () => void;
  userData: Product;
}

function UpdateProductModal({ onClose, userData }: Props) {
  const initialData: UpdateProduct = {
    name: userData.name,
    description: userData.description,
    basePrice: userData.basePrice,
    status: userData.status as ProductStatusString,
  };

  const [dataUser, setDataUser] = useState<UpdateProduct>(initialData);
  const { updateProduct } = useProducts();
  const [success, setSuccess] = useState<boolean>(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProduct.mutate(
      { id: userData.id, product: dataUser },
      {
        onSuccess: () => {
          setDataUser(initialData);
          setSuccess(true);
          setTimeout(() => {
            onClose();
          }, TIMEOUT_TOAST);
        },
        onError: (error) => {
          console.error("Error al actualizar el producto:", error);
          setSuccess(false);
        },
      }
    );
  };

  return (
    <StructureModal title="Actualizar Producto" close={() => onClose()}>
      <form onSubmit={(e) => submit(e)} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            value={dataUser.name}
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Ingrese la descripción"
            value={dataUser.description}
            onChange={(e) =>
              setDataUser({ ...dataUser, description: e.target.value })
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
            value={dataUser.basePrice}
            onChange={(e) =>
              setDataUser({ ...dataUser, basePrice: Number(e.target.value) })
            }
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={dataUser.status}
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                status: e.target.value as ProductStatusString,
              })
            }
          >
            <option value={ProductStatusString.ACTIVE}>Activo</option>
            <option value={ProductStatusString.DRAFT}>Borrador</option>
            <option value={ProductStatusString.ARCHIVED}>Archivado</option>
          </select>
        </div>
        <button type="submit" className={success ? "button-success" : ""}>
          {success ? "Actualizado" : "Actualizar"}
        </button>
      </form>
    </StructureModal>
  );
}

export default UpdateProductModal;
