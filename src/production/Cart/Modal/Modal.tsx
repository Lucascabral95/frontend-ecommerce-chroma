"use client";
import { useMemo } from "react";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";

import { useCartStore } from "@/lib/zustand/CartZustand";
import EstructureCartMobile from "../EstructureCart/EstructureCartMobile";
import "./Modal.scss";

interface Props {
  close?: () => void;
}

function Modal({ close }: Props) {
  const { cart } = useCartStore();
  const productsCart = useMemo(() => cart, [cart]);

  return (
    <div className="modal-cart" onClick={() => close?.()}>
      <div
        className="modal-cart__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="titulo">
          <IoIosArrowBack className="icon-back" onClick={() => close?.()} />
          <h3 className="tit"> Mi carrito </h3>
          <IoMdClose className="icon" onClick={() => close?.()} />
        </div>
        <div className="body-cart">
          <EstructureCartMobile cartById={productsCart} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
