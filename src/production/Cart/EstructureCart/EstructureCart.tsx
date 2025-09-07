"use client";
import { useState } from "react";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import CartCard from "./CartCard/CartCard";
import { deleteItemById, updateCartItemByItemId } from "@/lib/CartsApi";
import Toast from "@/Shared/Components/Toast";

import "./EstructureCart.scss";

const TOAST_DURATION = 1900;

interface Props {
  cartById: CartByIdInterface | undefined;
  cartTotal: number;
  cartItems: CartByIdInterface | undefined;
  setCartItems: (
    items:
      | CartByIdInterface
      | undefined
      | ((prev: CartByIdInterface | undefined) => CartByIdInterface | undefined)
  ) => void;
}

function EstructureCart({
  cartById,
  cartTotal,
  cartItems,
  setCartItems,
}: Props) {
  const [toast, setToast] = useState<{ message: string; error: boolean }>({
    message: "",
    error: false,
  });

  const aumentQuantity = (id: string) => {
    setCartItems((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items?.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    });

    updateCartItemByItemId(id, {
      quantity:
        (cartItems?.items?.find((item) => item.id === id)?.quantity || 0) + 1,
    })
      .then(() => {
        setToast({ message: "Item actualizado correctamente", error: false });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      })
      .catch(() => {
        setToast({ message: "Error al actualizar el item", error: true });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      });
  };

  const decrementQuantity = (id: string) => {
    setCartItems((prev) => {
      if (!prev) return prev;

      if (prev.items?.some((item) => item.id === id && item.quantity === 1))
        return prev;

      return {
        ...prev,
        items: prev.items?.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    });
    updateCartItemByItemId(id, {
      quantity:
        (cartItems?.items?.find((item) => item.id === id)?.quantity || 0) - 1,
    })
      .then(() => {
        setToast({ message: "Item actualizado correctamente", error: false });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      })
      .catch(() => {
        setToast({ message: "Error al actualizar el item", error: true });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items?.filter((item) => item.id !== id),
      };
    });
    deleteItemById(cartItems?.id as string, id)
      .then(() => {
        setToast({ message: "Item eliminado correctamente", error: false });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      })
      .catch(() => {
        setToast({ message: "Error al eliminar el item", error: true });
        setTimeout(
          () => setToast({ message: "", error: false }),
          TOAST_DURATION
        );
      });
  };

  const checkout = () => {
    console.log(`Checkout: ${JSON.stringify(cartById)}`);
  };

  return (
    <div className="estructure-cart">
      <div className="estructure-cart__container">
        <div className="container-cards">
          <CartCard
            cartItems={cartItems}
            aumentQuantity={aumentQuantity}
            decrementQuantity={decrementQuantity}
            handleRemoveItem={handleRemoveItem}
            checkout={checkout}
          />
        </div>
        <div className="container-info">
          <h3> Resumen de compra</h3>
          <div className="container-sections-break">
            <div className="subtotal-price">
              <div className="subtotal">
                <p>Subtotal</p>
              </div>
              <div className="price">
                <p> ${cartTotal || 0}</p>
              </div>
            </div>
          </div>
          <div className="container-sections-break">
            <div className="subtotal-price">
              <div className="subtotal">
                <p>Descuento total</p>
              </div>
              <div className="price">
                <p> $0</p>
              </div>
            </div>
          </div>
          <div className="container-sections-break">
            <div className="total-price">
              <div className="total">
                <p>Total</p>
              </div>
              <div className="price">
                <p> ${cartTotal || 0}</p>
              </div>
            </div>
          </div>
          <div className="container-sections-break-button">
            <button onClick={checkout}> INICIAR COMPRA </button>
          </div>
        </div>
      </div>
      {toast.message && <Toast message={toast.message} error={toast.error} />}
    </div>
  );
}

export default EstructureCart;
