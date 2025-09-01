"use client";
import React, { useState } from "react";

import { GoCreditCard } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbArrowsExchange2 } from "react-icons/tb";

import "./MethodsPayments.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface DetailsInterface {
  id: number;
  icon: React.ReactNode;
  name: string;
  details: string;
}

function MethodsPayments() {
  const details: DetailsInterface[] = [
    {
      id: 1,
      icon: <GoCreditCard className="icon" />,
      name: "Métodos de pago",
      details:
        "Aceptamos Mercado Pago y todos sus medios de pago. Pagá con tarjetas de crédito, débito, efectivo en puntos de pago, o dinero en tu cuenta. Aprovechá hasta 12 cuotas sin interés con bancos seleccionados. Las promociones de Mercado Pago se aplican según tu banco. Todas las transacciones son seguras y tus datos están protegidos. No almacenamos información de tarjetas.",
    },
    {
      id: 2,
      icon: <CiDeliveryTruck className="icon" />,
      name: "Método de envío",
      details:
        "Realizamos envíos a todo el país. Trabajamos con TREGGO, ANDREANI  y OCA como transportes logísticos para dichos envíos. Además contamos con modalidad de retiro en tiendas de la marca y sucursales ANDREANI y OCA.",
    },
    {
      id: 3,
      icon: <TbArrowsExchange2 className="icon" />,
      name: "Método de cambio",
      details:
        "Para realizar un cambio de producto, la prenda debe estar en el mismo estado en el que fueron recibidas, sin uso y con el embalaje y etiquetas originales. Estas condiciones no aplican para cambios de ropa interior ya que las mismas no tienen cambio. El plazo para solicitarlo es de hasta 30 días corridos desde recibida la prenda.",
    },
  ];

  const [descriptionOpen, setDescriptionOpen] = useState<number | null>(null);

  const openDetail = (index: number) => {
    if (descriptionOpen === index) {
      setDescriptionOpen(null);
    } else {
      setDescriptionOpen(index);
    }
  };

  return (
    <div className="methods-payments">
      <div className="methods-payments__container">
        {details.map((detail, index) => (
          <div className="method-service" key={index}>
            <div className="icon-name-close" onClick={() => openDetail(index)}>
              <div className="icono-details_name">
                <div className="icono">{detail.icon}</div>
                <div className="details-name">
                  <p> {detail.name}</p>
                </div>
              </div>
              <div className="icono-close">
                {descriptionOpen === index ? (
                  <MdKeyboardArrowUp className="icon" />
                ) : (
                  <MdKeyboardArrowDown className="icon" />
                )}
              </div>
            </div>
            {descriptionOpen === index && (
              <div className="description">
                <p> {detail.details} </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MethodsPayments;
