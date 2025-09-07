"use client";
import React from "react";

import { CiLogin, CiUser } from "react-icons/ci";
import Link from "next/link";
import useAuthStore from "@/lib/zustand/AuthZustand";

import "./MenuBurguer.scss";

interface Section {
  url: string;
  name: string;
  icon?: React.ReactNode;
}

interface Props {
  close: () => void;
}

function MenuBurguerMobile({ close }: Props) {
  const { userDataSession, logout } = useAuthStore();

  const ingresar: Section = {
    url: "/customer/account/login",
    name: "INGRESAR",
    icon: <CiUser className="icon" />,
  };

  const logoutSection: Section = {
    url: "/",
    name: "CERRAR SESIÓN",
    icon: <CiLogin className="icon" />,
  };

  const sections: Section[] = [
    { url: "/", name: "ABRIGOS" },
    { url: "/", name: "CAMISAS" },
    { url: "/", name: "PANTALONES" },
    { url: "/", name: "JEANS" },
    { url: "/", name: "TRAJES Y SACOS" },
    { url: "/", name: "REMERAS" },
    { url: "/", name: "CHOMBAS" },
    { url: "/", name: "SWEATERS" },
  ];

  return (
    <div className="menu-burguer-mobile" onClick={() => close()}>
      <div
        className="menu-burguer-mobile__container"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="ul-section">
          <Link
            href={userDataSession ? logoutSection.url : ingresar.url}
            className="link-section link-logout-access"
            onClick={userDataSession ? logout : () => close()}
          >
            <li className="li-section-ingresar">
              <div className="icono">
                {userDataSession ? logoutSection.icon : ingresar.icon}
              </div>
              <p>{userDataSession ? logoutSection.name : ingresar.name}</p>
            </li>
          </Link>

          {sections.map((item, index) => {
            return (
              <Link
                href={item.url}
                className="link-section"
                key={index}
                onClick={() => close()}
              >
                <li className="li-section">
                  {item.icon && <div className="icono">{item.icon}</div>}
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="footer-menu-burguer">
          <ul className="ul-section-footer">
            <li className="li-section-footer">CHROMA</li>
            <li className="li-section-footer">CHROMA</li>
            <li className="li-section-footer">CHROMA</li>
            <li className="li-section-footer">
              Desarrollado con <span>❤</span> por Lucas Cabral
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuBurguerMobile;
