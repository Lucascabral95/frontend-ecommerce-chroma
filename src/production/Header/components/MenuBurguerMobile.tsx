"use client";
import { ReactNode, useCallback } from "react";
import Link from "next/link";
import { CiLogin, CiUser } from "react-icons/ci";

import useAuthStore from "@/lib/zustand/AuthZustand";
import categories from "@/lib/Categories";
import "./MenuBurguer.scss";

interface Section {
  url: string;
  name: string;
  icon?: ReactNode;
}

interface Props {
  close: () => void;
}

const GIT_HUB_URL = "https://github.com/Lucascabral95";

const LOGIN_SECTION: Section = {
  url: "/customer/account/login",
  name: "INGRESAR",
  icon: <CiUser className="icon" />,
};

const LOGOUT_SECTION: Section = {
  url: "/",
  name: "CERRAR SESIÓN",
  icon: <CiLogin className="icon" />,
};

function MenuBurguerMobile({ close }: Props) {
  const { userDataSession, logout } = useAuthStore();

  const handleAuthAction = useCallback(() => {
    if (userDataSession) {
      logout();
    } else {
      close();
    }
  }, [userDataSession, logout, close]);

  const handleOverlayClick = useCallback(() => {
    close();
  }, [close]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleSectionClick = useCallback(() => {
    close();
  }, [close]);

  const authSection = userDataSession ? LOGOUT_SECTION : LOGIN_SECTION;

  return (
    <div className="menu-burguer-mobile" onClick={handleOverlayClick}>
      <div
        className="menu-burguer-mobile__container"
        onClick={handleContainerClick}
      >
        <ul className="ul-section">
          <Link
            href={authSection.url}
            className="link-section link-logout-access"
            onClick={handleAuthAction}
          >
            <li className="li-section-ingresar">
              <div className="icono">{authSection.icon}</div>
              <p>{authSection.name}</p>
            </li>
          </Link>

          {categories.map((item, index) => (
            <Link
              href={item.url}
              className="link-section"
              key={`category-${index}`}
              onClick={handleSectionClick}
            >
              <li className="li-section">{item.name}</li>
            </Link>
          ))}
        </ul>

        <div className="footer-menu-burguer">
          <ul className="ul-section-footer">
            <li className="li-section-footer">
              Desarrollado con <span>❤</span> por
              <a
                href={GIT_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="a-link-my-github"
              >
                Lucas Cabral
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuBurguerMobile;
