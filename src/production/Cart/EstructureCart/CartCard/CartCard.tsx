"use client";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import Table from "@/production/Table/Table";
import Image from "next/image";
import { CgMathPlus, CgMathMinus, CgTrash } from "react-icons/cg";

import "./CartCard.scss";
import Link from "next/link";

interface Props {
  cartItems: CartByIdInterface | undefined;
  aumentQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  handleRemoveItem: (id: string) => void;
  checkout: () => void;
}

function CartCard({
  cartItems,
  aumentQuantity,
  decrementQuantity,
  handleRemoveItem,
}: Props) {
  return (
    <div className="cart-cart">
      <div className="cart-cart__container">
        <Table
          headers={["Producto", "Precio", "Cantidad", "Subtotal"]}
          data={cartItems?.items || []}
          renderRow={(item) => (
            <>
              <td className="td-product-image-title-size table-of-desktop">
                <div className="image">
                  <Link href={`/product/${item?.variant?.product?.id}`}>
                    <Image
                      className="image-image"
                      src={item?.variant?.product?.images[0]?.url}
                      alt={item?.variant?.product?.name}
                      width={50}
                      height={75}
                    />
                  </Link>
                </div>
                <div className="title-size">
                  <Link
                    className="title-size-link"
                    href={`/product/${item?.variant?.product?.id}`}
                  >
                    {item?.variant?.product?.name}
                  </Link>
                  <p> Talle: {item?.variant?.size}</p>
                </div>
              </td>
              <td className="table-of-desktop">{item?.variant?.price}</td>

              <td className="td-quantity table-of-desktop">
                <div className="quantity-button">
                  <div
                    className="icono"
                    onClick={() => decrementQuantity(item?.id)}
                  >
                    <CgMathMinus className="icon" />
                  </div>
                  <p>{item?.quantity}</p>
                  <div
                    className="icono"
                    onClick={() => aumentQuantity(item?.id)}
                  >
                    <CgMathPlus className="icon" />
                  </div>
                </div>
              </td>
              <td className="table-of-desktop">
                {item?.variant?.price * item?.quantity}
              </td>

              <td
                className="trash table-of-desktop"
                onClick={() => handleRemoveItem(item?.id)}
              >
                <CgTrash className="icon" />
              </td>

              <tr className="table-mobile">
                <div className="imagen">
                  <Link href={`/product/${item?.variant?.product?.id}`}>
                    <Image
                      className="imagen-imagen"
                      width={50}
                      height={75}
                      alt={item?.variant?.product?.name}
                      src={item?.variant?.product?.images[0]?.url}
                    />
                  </Link>
                  <div className="container-second">
                    <div className="title">
                      <Link
                        className="title-size-link"
                        href={`/product/${item?.variant?.product?.id}`}
                      >
                        {item?.variant?.product?.name}
                      </Link>
                    </div>
                    <div className="size">
                      <p> Talle: {item?.variant?.size} </p>
                    </div>
                    <div className="price">
                      <p> ${item?.variant?.price} </p>
                    </div>
                    <div className="td-of-quantity">
                      <div className="quantity-button">
                        <div
                          className="icono"
                          onClick={() => decrementQuantity(item?.id)}
                        >
                          <CgMathMinus className="icon" />
                        </div>
                        <p>{item?.quantity}</p>
                        <div
                          className="icono"
                          onClick={() => aumentQuantity(item?.id)}
                        >
                          <CgMathPlus className="icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-third">
                  <div className="icono">
                    <CgTrash
                      className="icon"
                      onClick={() => handleRemoveItem(item?.id)}
                    />
                  </div>
                  <div className="text">
                    <p> ${item?.variant?.price * item?.quantity} </p>
                  </div>
                </div>
              </tr>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default CartCard;
