// "use client";
// import { FormEvent, useMemo, useState } from "react";

// import { COLORS, SIZES } from "@/Shared/Constants/categories";
// import {
//   Size,
//   UpdateProductVariant,
// } from "@/Insfraestructure/Interfaces/products/variants/variants.interface";
// import StructureModal from "../../../StructureModal";
// import useProductVariants from "@/production/Hooks/useProductVariants";
// import { Variant } from "@/Insfraestructure/Interfaces/products/product.interface";

// const TIMEOUT_TOAST = 1600;

// interface Props {
//   onClose: () => void;
//   dataProductVariant: Variant;
// }

// function UpdateOldProductModal({ onClose, dataProductVariant }: Props) {
//   const initialData: UpdateProductVariant = {
//     colorId: dataProductVariant.colorId,
//     sku: dataProductVariant.sku,
//     barcode: dataProductVariant.barcode,
//     size: dataProductVariant.size as unknown as Size,
//     price: dataProductVariant.price,
//     stock: dataProductVariant.stock,
//     weightGrams: dataProductVariant.weightGrams,
//   };

//   const [dataUser, setDataUser] = useState<UpdateProductVariant>(initialData);
//   const { updateProductVariant } = useProductVariants();
//   const [success, setSuccess] = useState<boolean>(false);
//   const colors = useMemo(() => COLORS, []);
//   const sizes = useMemo(() => SIZES, []);

//   const submit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     updateProductVariant.mutate(
//       { id: dataProductVariant.id, productVariant: dataUser },
//       {
//         onSuccess: () => {
//           setDataUser(initialData);
//           setSuccess(true);
//           setTimeout(() => {
//             onClose();
//           }, TIMEOUT_TOAST);
//         },
//         onError: (error) => {
//           console.error("Error al actualizar el producto:", error);
//           setSuccess(false);
//         },
//       }
//     );
//   };

//   return (
//     <StructureModal title="Actualizar Producto" close={() => onClose()}>
//       <form onSubmit={(e) => submit(e)} className="form-inside">
//         <div className="form-input-group">
//           <select
//             name="color"
//             id="color"
//             value={dataUser.colorId}
//             onChange={(e) =>
//               setDataUser({ ...dataUser, colorId: e.target.value })
//             }
//           >
//             <option value="">Seleccionar Color</option>
//             {colors.map((color) => (
//               <option key={color.id} value={color.id}>
//                 {color.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-input-group">
//           <label htmlFor="sku">SKU</label>
//           <input
//             type="text"
//             id="sku"
//             name="sku"
//             placeholder="Ingrese el SKU"
//             value={dataUser.sku}
//             onChange={(e) => setDataUser({ ...dataUser, sku: e.target.value })}
//           />
//         </div>
//         <div className="form-input-group">
//           <label htmlFor="barcode">Barcode</label>
//           <input
//             type="text"
//             id="barcode"
//             name="barcode"
//             placeholder="Ingrese el Barcode"
//             value={dataUser.barcode}
//             onChange={(e) =>
//               setDataUser({ ...dataUser, barcode: e.target.value })
//             }
//           />
//         </div>
//         <div className="form-input-group">
//           <select
//             name="size"
//             id="size"
//             value={dataUser.size}
//             onChange={(e) =>
//               setDataUser({ ...dataUser, size: e.target.value as Size })
//             }
//           >
//             <option value="">Seleccionar Talla</option>
//             {sizes.map((size) => (
//               <option key={size.value} value={size.value}>
//                 {size.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-input-group">
//           <label htmlFor="price">Precio</label>
//           <input
//             type="text"
//             id="price"
//             name="price"
//             placeholder="Ingrese el Precio"
//             value={dataUser.price}
//             onChange={(e) =>
//               setDataUser({ ...dataUser, price: parseInt(e.target.value) })
//             }
//           />
//         </div>
//         <div className="form-input-group">
//           <label htmlFor="stock">Stock</label>
//           <input
//             type="text"
//             id="stock"
//             name="stock"
//             placeholder="Ingrese el Stock"
//             value={dataUser.stock}
//             onChange={(e) =>
//               setDataUser({ ...dataUser, stock: parseInt(e.target.value) })
//             }
//           />
//         </div>
//         <div className="form-input-group">
//           <label htmlFor="weightGrams">Gramos</label>
//           <input
//             type="text"
//             id="weightGrams"
//             name="weightGrams"
//             placeholder="Ingrese el Peso en Gramos"
//             value={dataUser.weightGrams}
//             onChange={(e) =>
//               setDataUser({
//                 ...dataUser,
//                 weightGrams: parseInt(e.target.value),
//               })
//             }
//           />
//         </div>
//         <button type="submit" className={success ? "button-success" : ""}>
//           {success ? "Actualizado" : "Actualizar"}
//         </button>
//       </form>
//     </StructureModal>
//   );
// }

// export default UpdateOldProductModal;
"use client";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";

import { COLORS, SIZES } from "@/Shared/Constants/categories";
import {
  Size,
  UpdateProductVariant,
} from "@/Insfraestructure/Interfaces/products/variants/variants.interface";
import StructureModal from "../../../StructureModal";
import useProductVariants from "@/production/Hooks/useProductVariants";
import { Variant } from "@/Insfraestructure/Interfaces/products/product.interface";

const TIMEOUT_TOAST = 1600;

interface Props {
  onClose: () => void;
  dataProductVariant: Variant;
}

function UpdateOldProductModal({ onClose, dataProductVariant }: Props) {
  const createInitialData = useCallback(
    (): UpdateProductVariant => ({
      colorId: dataProductVariant.colorId,
      sku: dataProductVariant.sku,
      barcode: dataProductVariant.barcode,
      size: dataProductVariant.size as unknown as Size,
      price: dataProductVariant.price,
      stock: dataProductVariant.stock,
      weightGrams: dataProductVariant.weightGrams,
    }),
    [dataProductVariant]
  );

  const [dataUser, setDataUser] =
    useState<UpdateProductVariant>(createInitialData);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { updateProductVariant } = useProductVariants();

  const handleInputChange = useCallback(
    (field: keyof UpdateProductVariant) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;

        setDataUser((prev) => ({
          ...prev,
          [field]:
            field === "price" || field === "stock" || field === "weightGrams"
              ? Math.max(0, parseFloat(value) || 0)
              : value,
        }));

        if (error) setError("");
      },
    [error]
  );

  const resetForm = useCallback(() => {
    setDataUser(createInitialData());
    setError("");
    setSuccess(false);
  }, [createInitialData]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!dataUser.colorId || !dataUser.sku || !dataUser.size) {
        setError("Por favor completa todos los campos requeridos");
        return;
      }

      setIsSubmitting(true);
      setError("");

      updateProductVariant.mutate(
        { id: dataProductVariant.id, productVariant: dataUser },
        {
          onSuccess: () => {
            setSuccess(true);
            setIsSubmitting(false);
            setTimeout(() => {
              onClose();
            }, TIMEOUT_TOAST);
          },
          onError: (error) => {
            console.error("Error al actualizar el producto:", error);
            setError(error.message || "Error al actualizar el producto");
            setSuccess(false);
            setIsSubmitting(false);
          },
        }
      );
    },
    [dataUser, dataProductVariant.id, updateProductVariant, onClose]
  );

  const hasChanges = useMemo(() => {
    const initial = createInitialData();
    return Object.keys(initial).some(
      (key) =>
        initial[key as keyof UpdateProductVariant] !==
        dataUser[key as keyof UpdateProductVariant]
    );
  }, [dataUser, createInitialData]);

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

  const clearError = useCallback(() => {
    if (error) setError("");
  }, [error]);

  return (
    <StructureModal title="Actualizar Producto" close={onClose}>
      <form onSubmit={handleSubmit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="color">Color</label>
          <select
            name="color"
            id="color"
            value={dataUser.colorId}
            required
            onChange={handleInputChange("colorId")}
            onFocus={clearError}
            disabled={isSubmitting}
          >
            <option value="">Seleccionar Color</option>
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
            value={dataUser.sku}
            required
            onChange={handleInputChange("sku")}
            onFocus={clearError}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="barcode">Código de Barras</label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            placeholder="Ingrese el código de barras"
            value={dataUser.barcode}
            required
            onChange={handleInputChange("barcode")}
            onFocus={clearError}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="size">Talla</label>
          <select
            name="size"
            id="size"
            value={dataUser.size}
            required
            onChange={handleInputChange("size")}
            onFocus={clearError}
            disabled={isSubmitting}
          >
            <option value="">Seleccionar Talla</option>
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
            value={dataUser.price || ""}
            min="0"
            step="0.01"
            required
            onChange={handleInputChange("price")}
            onFocus={clearError}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Ingrese el stock"
            value={dataUser.stock || ""}
            min="0"
            required
            onChange={handleInputChange("stock")}
            onFocus={clearError}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="weightGrams">Peso (g)</label>
          <input
            type="number"
            id="weightGrams"
            name="weightGrams"
            placeholder="Ingrese el peso en gramos"
            value={dataUser.weightGrams || ""}
            min="0"
            step="0.01"
            required
            onChange={handleInputChange("weightGrams")}
            onFocus={clearError}
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="error" style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <div className="form-actions" style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting || !hasChanges}
            className="button-reset"
            style={{
              opacity: !hasChanges || isSubmitting ? 0.5 : 1,
              cursor: !hasChanges || isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            Resetear
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className={success ? "button-success" : "button-update"}
            style={{
              backgroundColor: success ? "green" : undefined,
              opacity: !hasChanges || isSubmitting ? 0.5 : 1,
              cursor: !hasChanges || isSubmitting ? "not-allowed" : "pointer",
              flex: 1,
            }}
          >
            {isSubmitting
              ? "Actualizando..."
              : success
              ? "✓ Actualizado"
              : "Actualizar"}
          </button>
        </div>
      </form>
    </StructureModal>
  );
}

export default UpdateOldProductModal;
