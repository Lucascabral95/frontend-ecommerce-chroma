"use client";
import Favicon from "@/production/components/Favicon";
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

interface Props {
  children: ReactNode;
}

export default function ReactHelmetAsyncProvider({ children }: Props) {
  return (
    <HelmetProvider>
      <Favicon />
      {children}
    </HelmetProvider>
  );
}
