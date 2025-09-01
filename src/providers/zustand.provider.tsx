"use client";
import useAuthStore from "@/lib/zustand/AuthZustand";
import { useEffect } from "react";

interface StoreInitializerProps {
  children: React.ReactNode;
}

export function StoreInitializer({ children }: StoreInitializerProps) {
  const { initializeFromStorage } = useAuthStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return <>{children}</>;
}
