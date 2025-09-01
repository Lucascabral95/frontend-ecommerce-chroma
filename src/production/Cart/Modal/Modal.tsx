import React from "react";

import "./Modal.scss";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";

interface Props {
  close?: () => void;
  // products?: any[]
}

function Modal({ close }: Props) {
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
          <div className="cart-empty">
            <p> No hay productos en el carrito </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
