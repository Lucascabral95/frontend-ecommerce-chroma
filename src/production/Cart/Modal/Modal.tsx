import React from "react";

import "./Modal.scss";
import { IoMdClose } from "react-icons/io";

interface Props {
  close?: () => void;
  // products?: any[]
}

function Modal({ close }: Props) {
  return (
    <div className="modal-cart">
      <div className="modal-cart__container">
        <div className="titulo">
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
