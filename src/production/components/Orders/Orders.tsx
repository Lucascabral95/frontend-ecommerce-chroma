import Link from "next/link";
import Image from "next/image";

import { GetOrdersByUserIdInterface } from "@/Insfraestructure/Interfaces/Orders/Orders";
import { FaBoxOpen, FaChevronRight } from "react-icons/fa";
import "./Orders.scss";

interface Props {
  orders: GetOrdersByUserIdInterface[];
}

function Orders({ orders }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "status--paid";
      case "PENDING":
        return "status--pending";
      case "CANCELLED":
        return "status--cancelled";
      case "FULFILLED":
        return "status--fulfilled";
      case "REFUNDED":
        return "status--refunded";
      default:
        return "";
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="orders-empty__icon">
          <FaBoxOpen />
        </div>
        <h3 className="orders-empty__title">No tienes pedidos todavía</h3>
        <p className="orders-empty__text">
          Aquí aparecerá el historial de tus compras.
        </p>
        <Link href="/" className="orders-empty__button">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <Link
          href={`/orders/detail/${order.id}`}
          key={order.id}
          className="order-card"
        >
          <div className="order-card__header">
            <div className="order-card__info">
              <span className="order-card__number">Pedido #{order.number}</span>
              <span className="order-card__date">
                {new Date(order.createdAt).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div
              className={`order-card__status ${getStatusClass(order.status)}`}
            >
              {order.status}
            </div>
          </div>

          <div className="order-card__body">
            <div className="order-card__items">
              {order.items.slice(0, 3).map((item) => (
                <Image
                  src={item.variant.product.images[0].url}
                  alt={item.productName}
                  width={100}
                  height={100}
                  key={item.id}
                  className="order-card__item-placeholder"
                />
              ))}
              {order.items.length > 3 && (
                <div className="order-card__more-items">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
            <div className="order-card__total">
              <span>Total</span>
              <p>{formatCurrency(order.total)}</p>
            </div>
          </div>

          <div className="order-card__footer">
            <span>Ver detalles</span>
            <FaChevronRight className="order-card__arrow" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Orders;
