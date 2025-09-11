import Link from "next/link";
import Image from "next/image";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import Table from "@/production/Table/Table";
import "@/production/Cart/EstructureCart/CartCard/CartCard.scss";

interface Props {
  cart: CartByIdInterface | undefined;
  width?: string;
}

function CheckoutCart({ cart, width }: Props) {
  return (
    <div className="cart-cart" style={{ width: width ?? "100%" }}>
      <div className="cart-cart__container" style={{ width: width ?? "100%" }}>
        <Table
          headers={["Producto", "Precio", "Cantidad", "Subtotal"]}
          data={cart?.items || []}
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
                <div
                  className="quantity-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>{item?.quantity}</p>
                </div>
              </td>
              <td className="table-of-desktop">
                {item?.variant?.price * item?.quantity}
              </td>

              {/* Mobile  */}
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
                        <p>{item?.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-third">
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

export default CheckoutCart;
