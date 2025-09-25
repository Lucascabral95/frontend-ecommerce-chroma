import { useCallback, useMemo, useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { GoPencil, GoTrash } from "react-icons/go";

import TableDashboard from "../Tables/TableDashboard";
import { getColorById } from "@/Shared/Constants/categories";
import AddProductVariant from "../Modals/Product/ProductVariant/AddProductVariant/AddProductVariant";
import UpdateOldProductModal from "../Modals/Product/ProductVariant/UpdateProductVariant/UpdateProductVariant";
import { Variant } from "@/Insfraestructure/Interfaces/products/product.interface";
import "./Variants.scss";
import useProductVariants from "@/production/Hooks/useProductVariants";
import Toast from "@/Shared/Components/Toast";
import useToast from "@/Shared/hooks/useToast";
import { OpenConfirmInterface } from "@/Shared/Interfaces/open-confirm-interface";
import ConfirmComponent from "../Confirm/Confirm";

interface Props {
  variants?: Variant[];
  title: string;
  productId: string | undefined;
}

const MAX_STOCK_LIMIT = 1000;
const MIN_STOCK_LIMIT = 0;

const HEADERS = [
  "SKU",
  "Talla",
  "Color",
  "Precio",
  "Peso (g)",
  "Stock",
  "Acciones",
];

interface ModalState {
  isAddModalOpen: boolean;
  isUpdateModalOpen: boolean;
  currentVariant: Variant | null;
}

function Variants({ variants, title, productId }: Props) {
  const { toast, showToast } = useToast();
  const { updateProductVariant, deleteProductVariant } = useProductVariants(
    productId!
  );
  const [openConfirm, setOpenConfirm] = useState<OpenConfirmInterface>({
    open: false,
    id: "",
  });

  const [modalState, setModalState] = useState<ModalState>({
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    currentVariant: null,
  });

  const headers = useMemo(() => HEADERS, []);

  const handleStockChange = useCallback(
    (variant: Variant, operation: "increment" | "decrement") => {
      const isIncrement = operation === "increment";
      const newStock = isIncrement ? variant.stock + 1 : variant.stock - 1;

      const withinLimits = isIncrement
        ? variant.stock < MAX_STOCK_LIMIT
        : variant.stock > MIN_STOCK_LIMIT;

      if (!withinLimits) {
        showToast(
          `No se puede ${
            isIncrement ? "incrementar" : "disminuir"
          } el stock. Stock actual: ${variant.stock}`,
          true
        );
        return;
      }

      updateProductVariant.mutate({
        id: variant.id,
        productVariant: { stock: newStock },
      });

      showToast(
        `Stock ${
          isIncrement ? "incrementado" : "disminuido"
        }. Stock actual: ${newStock}`,
        false
      );
    },
    [updateProductVariant, showToast]
  );

  const handleIncrementStock = useCallback(
    (variant: Variant) => handleStockChange(variant, "increment"),
    [handleStockChange]
  );

  const handleDecrementStock = useCallback(
    (variant: Variant) => handleStockChange(variant, "decrement"),
    [handleStockChange]
  );

  const handleUpdateProduct = useCallback((variant: Variant) => {
    setModalState((prev) => ({
      ...prev,
      currentVariant: variant,
      isUpdateModalOpen: true,
    }));
  }, []);

  const handleAddNewProductVariant = useCallback(() => {
    setModalState((prev) => ({ ...prev, isAddModalOpen: true }));
  }, []);

  const closeAddModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isAddModalOpen: false }));
  }, []);

  const closeUpdateModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isUpdateModalOpen: false,
      currentVariant: null,
    }));
  }, []);

  const handleConfirmDelete = useCallback((variant: Variant) => {
    setOpenConfirm({ open: true, id: variant.id });
  }, []);

  const handleCancelDelete = useCallback(() => {
    setOpenConfirm({ open: false, id: "" });
  }, []);

  const handleDeleteProductVariant = useCallback(
    (id: string) => {
      deleteProductVariant.mutate(id, {
        onSuccess: () => {
          setOpenConfirm({ open: false, id: "" });
          showToast(`Variante ${id} eliminada exitosamente`, false);
        },
        onError: (error) => {
          showToast(`Error al eliminar la variante: ${error.message}`, true);
        },
      });
    },
    [deleteProductVariant, showToast]
  );

  const tableRows = useMemo(() => {
    if (!variants?.length) return [];

    return variants.map((variant) => (
      <tr key={variant.id} className="table-row">
        <td className="row-data">{variant.sku}</td>
        <td className="row-data">{variant.size}</td>
        <td className="row-data">{getColorById(variant.colorId)}</td>
        <td className="row-data">${variant.price}</td>
        <td className="row-data">{variant.weightGrams}</td>
        <td className="row-data__stock">
          <button
            type="button"
            className="icono"
            onClick={() => handleDecrementStock(variant)}
            aria-label={`Disminuir stock de ${variant.sku}`}
            disabled={variant.stock <= MIN_STOCK_LIMIT}
          >
            <CgMathMinus className="icon" />
          </button>
          <span>{variant.stock}</span>
          <button
            type="button"
            className="icono"
            onClick={() => handleIncrementStock(variant)}
            aria-label={`Incrementar stock de ${variant.sku}`}
            disabled={variant.stock >= MAX_STOCK_LIMIT}
          >
            <CgMathPlus className="icon" />
          </button>
        </td>
        <td className="update-delete">
          <button
            type="button"
            className="icono"
            onClick={() => handleConfirmDelete(variant)}
            aria-label={`Eliminar producto ${variant.sku}`}
          >
            <GoTrash className="icon" />
          </button>
          <button
            type="button"
            className="icono"
            onClick={() => handleUpdateProduct(variant)}
            aria-label={`Editar producto ${variant.sku}`}
          >
            <GoPencil className="icon" />
          </button>
        </td>
      </tr>
    ));
  }, [
    variants,
    handleUpdateProduct,
    handleIncrementStock,
    handleDecrementStock,
  ]);

  const toastComponent = useMemo(() => {
    return toast.message ? (
      <Toast message={toast.message} error={toast.error} />
    ) : null;
  }, [toast.message, toast.error]);

  return (
    <div className="variants-variants">
      <div className="variants-variants__container">
        <h2 className="variants-title">{title}</h2>
        <div className="add-new-variant">
          <button
            type="button"
            className="button-add-new-product-variant"
            onClick={handleAddNewProductVariant}
          >
            Agregar nueva variante
          </button>
        </div>
        <TableDashboard headers={headers} rows={tableRows} />
      </div>

      {modalState.isAddModalOpen && (
        <AddProductVariant close={closeAddModal} productId={productId!} />
      )}

      {modalState.isUpdateModalOpen && modalState.currentVariant && (
        <UpdateOldProductModal
          onClose={closeUpdateModal}
          dataProductVariant={modalState.currentVariant}
        />
      )}

      {toastComponent}

      {openConfirm.open && (
        <ConfirmComponent
          title="Eliminar variante"
          message="¿Estás seguro de eliminar esta variante?"
          onConfirm={() => handleDeleteProductVariant(openConfirm.id)}
          onCancel={handleCancelDelete}
          isOpen={openConfirm.open}
        />
      )}
    </div>
  );
}

export default Variants;
