"use client";
import { Suspense } from "react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import useAuthStore from "@/lib/zustand/AuthZustand";
import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import { getOrderByUserId } from "@/lib/OrdersApi";
import {
  GetOrdersByUserIdInterfaceArray,
  OrderStatus,
} from "@/Insfraestructure/Interfaces/Orders/Orders";
import { FilstersOrdersInterface } from "@/Insfraestructure/Interfaces/Orders/Orders";
import Orders from "@/production/components/Orders/Orders";
import "./OrdersRecord.scss";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

function OrdersContent() {
  const seoData = useSEO({
    title: "Historial de órdenes - Chroma",
    description: "Historial de órdenes - Chroma",
    path: "/orders/record",
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "historial de órdenes, órdenes, Chroma, historial de compras, compras aprovadas, compras rechazadas, compras pendientes, compras entregadas, compras canceladas, compras reembolsadas",
    type: "website",
    noIndex: true,
  });
  const { userDataSession } = useAuthStore();
  const searchParams = useSearchParams();

  const [statusSelected, setStatusSelected] = useState<OrderStatus>(
    OrderStatus.PAID
  );

  const [orders, setOrders] = useState<
    GetOrdersByUserIdInterfaceArray | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    message: string;
    status: number | null;
  }>({
    message: "",
    status: null,
  });

  const buildFilters = useCallback((): FilstersOrdersInterface => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    return {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 100,
      status: statusSelected,
    };
  }, [searchParams, statusSelected]);

  const fetchOrders = useCallback(async () => {
    if (!userDataSession) return;

    setLoading(true);
    setError({ message: "", status: null });

    try {
      const data = await getOrderByUserId(userDataSession.id, buildFilters());
      setOrders(data);
    } catch (err: any) {
      setError({ message: err.message, status: err.status });
    } finally {
      setLoading(false);
    }
  }, [userDataSession, buildFilters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <SEO {...seoData} />
      <div className="orders-record">
        <div className="orders-record__container">
          <div className="orders-filter-status">
            <select
              value={statusSelected}
              onChange={(e) => setStatusSelected(e.target.value as OrderStatus)}
            >
              <option value={OrderStatus.PENDING}>Pendientes</option>
              <option value={OrderStatus.PAID}>Pagadas</option>
              <option value={OrderStatus.FULFILLED}>Entregadas</option>
              <option value={OrderStatus.CANCELLED}>Canceladas</option>
              <option value={OrderStatus.REFUNDED}>Reembolsadas</option>
            </select>
          </div>

          {loading ? (
            <p>Cargando...</p>
          ) : error.status ? (
            <p>{error.message}</p>
          ) : orders?.orders?.length ? (
            <Orders orders={orders.orders} />
          ) : (
            <p>No hay órdenes</p>
          )}
        </div>
      </div>
    </>
  );
}

function OrdersLoading() {
  return (
    <div className="orders-record">
      <div className="orders-record__container">
        <p>Cargando historial...</p>
      </div>
    </div>
  );
}

function OrdersRecord() {
  return (
    <EstructureCartCheckoutProfile title="Historial de compra">
      <Suspense fallback={<OrdersLoading />}>
        <OrdersContent />
      </Suspense>
    </EstructureCartCheckoutProfile>
  );
}

export default OrdersRecord;
