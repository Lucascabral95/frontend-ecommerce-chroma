"use client";
import { Helmet } from "react-helmet-async";

export default function Favicon() {
  return (
    <Helmet>
      <link rel="icon" href="/img/logo-chroma-ecommerce.png" />
    </Helmet>
  );
}
