import React from "react";

import "./MenuBurguer.scss";

import Link from "next/link";

interface Sections {
  url: string;
  name: string;
}

function MenuBurguer() {
  const sections: Sections[] = [
    { url: "/", name: "INDUMENTARIA" },
    { url: "/accesorios", name: "ACCESORIOS" },
    { url: "/promociones", name: "PROMOCIONES" },
    { url: "/contacto", name: "CONTACTO" },
    { url: "/nosotros", name: "NOSOTROS" },
    { url: "/carrito", name: "CARRITO" },
    { url: "/mi-cuenta", name: "MI CUENTA" },
  ];

  return (
    <div className="men-bur">
      <div className="menu-burguer">
        <div className="menu-burguer__container">
          <ul>
            {sections.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.url}> {item.name} </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuBurguer;
