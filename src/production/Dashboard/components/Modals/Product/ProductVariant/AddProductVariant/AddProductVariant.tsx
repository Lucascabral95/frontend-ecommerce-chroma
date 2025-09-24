"use client";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import {
  CreateProductVariantInterface,
  Size,
} from "@/Insfraestructure/Interfaces/products/variants/variants.interface";
import StructureModal from "../../../StructureModal";
import "../../../StructureModal.scss";
import { COLORS, SIZES } from "@/Shared/Constants/categories";
import useProductVariants from "@/production/Hooks/useProductVariants";

interface Props {
  close: () => void;
  productId: string | null;
}

const TIMEOUT = 1200;

const INITIAL_FORM_STATE: Omit<CreateProductVariantInterface, "productId"> = {
  colorId: "",
  sku: "",
  barcode: "",
  size: "" as Size,
  price: 0,
  stock: 0,
  weightGrams: 0,
};

function AddProductVariant({ close, productId }: Props) {
  const { createProductVariant } = useProductVariants();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [newProductVariant, setNewProductVariant] =
    useState<CreateProductVariantInterface>(() => ({
      productId: productId!,
      ...INITIAL_FORM_STATE,
    }));

  const handleInputChange = useCallback(
    (field: keyof CreateProductVariantInterface) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;

        setNewProductVariant((prev) => ({
          ...prev,
          [field]:
            field === "price" || field === "stock" || field === "weightGrams"
              ? Math.max(0, parseInt(value) || 0)
              : value,
        }));
      },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (
        !newProductVariant.colorId ||
        !newProductVariant.sku ||
        !newProductVariant.size
      ) {
        setError("Por favor completa todos los campos requeridos");
        return;
      }

      createProductVariant.mutate(newProductVariant, {
        onSuccess: () => {
          setError("");
          setSuccess(true);
          setTimeout(close, TIMEOUT);
        },
        onError: (error) => {
          setError(error.message);
          setSuccess(false);
        },
      });
    },
    [newProductVariant, createProductVariant, close]
  );

  const clearError = useCallback(() => {
    if (error) setError("");
  }, [error]);

  const colorOptions = useMemo(
    () =>
      COLORS.map((color) => (
        <option key={color.id} value={color.id}>
          {color.name}
        </option>
      )),
    []
  );

  const sizeOptions = useMemo(
    () =>
      SIZES.map((size) => (
        <option key={size.value} value={size.value}>
          {size.label}
        </option>
      )),
    []
  );

  return (
    <StructureModal title="Agregar Variante de Producto" close={close}>
      <form onSubmit={handleSubmit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="colorId">Color</label>
          <select
            name="colorId"
            id="colorId"
            value={newProductVariant.colorId}
            required
            onChange={handleInputChange("colorId")}
            onFocus={clearError}
          >
            <option value="">Selecciona color</option>
            {colorOptions}
          </select>
        </div>

        <div className="form-input-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            placeholder="Ingrese el SKU"
            value={newProductVariant.sku}
            required
            onChange={handleInputChange("sku")}
            onFocus={clearError}
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="barcode">Código de Barras</label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            placeholder="Ingrese el código de barras"
            value={newProductVariant.barcode}
            required
            onChange={handleInputChange("barcode")}
            onFocus={clearError}
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="size">Talla</label>
          <select
            name="size"
            id="size"
            value={newProductVariant.size}
            required
            onChange={handleInputChange("size")}
            onFocus={clearError}
          >
            <option value="">Selecciona talla</option>
            {sizeOptions}
          </select>
        </div>

        <div className="form-input-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Ingrese el precio"
            value={newProductVariant.price || ""}
            min="0"
            step="0.01"
            required
            onChange={handleInputChange("price")}
            onFocus={clearError}
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Ingrese el stock"
            value={newProductVariant.stock || ""}
            min="0"
            required
            onChange={handleInputChange("stock")}
            onFocus={clearError}
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="weightGrams">Peso (g)</label>
          <input
            type="number"
            id="weightGrams"
            name="weightGrams"
            placeholder="Ingrese el peso"
            value={newProductVariant.weightGrams || ""}
            min="0"
            required
            onChange={handleInputChange("weightGrams")}
            onFocus={clearError}
          />
        </div>

        {error && (
          <div className="error" style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <button
          disabled={createProductVariant.isPending}
          type="submit"
          className="button-add-new-product-variant"
          style={{
            backgroundColor: success ? "green" : undefined,
            opacity: createProductVariant.isPending ? 0.7 : 1,
            cursor: createProductVariant.isPending ? "not-allowed" : "pointer",
          }}
        >
          {createProductVariant.isPending ? "Cargando..." : "Agregar"}
        </button>
      </form>
    </StructureModal>
  );
}

export default AddProductVariant;
