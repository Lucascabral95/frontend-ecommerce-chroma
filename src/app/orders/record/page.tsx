"use client";

import useAuthStore from "@/lib/zustand/AuthZustand";
import { useCartStore } from "@/lib/zustand/CartZustand";
import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import "./OrdersRecord.scss";
import { useEffect } from "react";

function OrdersRecord() {
  const { userDataSession } = useAuthStore();

  return (
    <EstructureCartCheckoutProfile title="Historial de compra">
      <div className="orders-record">
        <div className="orders-record__container"></div>
      </div>
    </EstructureCartCheckoutProfile>
  );
}

export default OrdersRecord;
