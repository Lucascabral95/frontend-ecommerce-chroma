"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import { getOrderById } from "@/lib/OrdersApi";
import { GetOrdersByUserIdInterface } from "@/Insfraestructure/Interfaces/Orders/Orders";
import { FaSpinner, FaExclamationCircle, FaMapMarkerAlt } from "react-icons/fa";
import "./OrderById.scss";

function OrderById() {
  const { orderid } = useParams() as { orderid: string };

  const [order, setOrder] = useState<GetOrdersByUserIdInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderid) {
      setLoading(true);
      getOrderById(orderid)
        .then((data) => {
          console.log(data);
          setOrder(data ?? null);
        })
        .catch((err) => {
          setError(err.message || "No se pudo cargar el detalle del pedido.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderid]);

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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="order-detail-status">
          <FaSpinner className="spinner-icon" />
          <p>Cargando detalle del pedido...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="order-detail-status error">
          <FaExclamationCircle className="error-icon" />
          <p>{error}</p>
        </div>
      );
    }

    if (!order) {
      return (
        <div className="order-detail-status">
          <p>No se encontró el pedido.</p>
        </div>
      );
    }

    return (
      <div className="order-detail__grid">
        <div className="order-detail__main">
          <div className="detail-card">
            <div className="detail-card__header">
              <h4>Productos del Pedido</h4>
            </div>
            <div className="detail-card__body">
              {order.items.map((item) => (
                <div key={item.id} className="product-item">
                  <Link href={`/product/${item?.variant?.product?.id}`}>
                    <Image
                      src={item?.variant?.product?.images[0].url}
                      alt={item?.productName}
                      width={80}
                      height={120}
                      className="product-item__image"
                    />
                  </Link>
                  <div className="product-item__info">
                    <Link
                      href={`/product/${item?.variant?.product?.id}`}
                      className="product-item__name"
                    >
                      {item?.productName}
                    </Link>
                    <p className="product-item__variant">
                      Talle: {item?.size} | Color: {item?.colorName}
                    </p>
                    <p className="product-item__sku">SKU: {item?.sku}</p>
                    <div className="product-item__price-qty">
                      <span>
                        {formatCurrency(item?.unitPrice)} x {item?.quantity}
                      </span>
                      <strong>
                        {formatCurrency(item?.unitPrice * item?.quantity)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-detail__sidebar">
          <div className="detail-card">
            <div className="detail-card__header">
              <h4>Resumen del Pedido</h4>
            </div>
            <div className="detail-card__body">
              <div className="summary-row">
                <span>Número de Pedido</span>
                <strong>#{order.number}</strong>
              </div>
              <div className="summary-row">
                <span>Fecha</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString("es-AR")}
                </span>
              </div>
              <div className="summary-row">
                <span>Estado</span>
                <span
                  className={`status-badge ${getStatusClass(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <hr className="divider" />
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>{formatCurrency(order.shipping ?? 0)}</span>
              </div>
              <hr className="divider" />
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card__header">
              <FaMapMarkerAlt />
              <h4>Dirección de Envío</h4>
            </div>
            <div className="detail-card__body address">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <EstructureCartCheckoutProfile title="Detalle del Pedido">
      <div className="order-detail">
        <div className="order-detail__container">{renderContent()}</div>
      </div>
    </EstructureCartCheckoutProfile>
  );
}

export default OrderById;
