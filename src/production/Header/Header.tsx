"use client";
import React, { useState } from "react";

import Link from "next/link";

import SectionStructure from "../Section/SectionStructure";
import { CiMenuBurger, CiShoppingCart, CiUser } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import "./Header.scss";
import MenuBurguer from "./components/MenuBurguer";
import Search from "./components/Search";
import Modal from "../Cart/Modal/Modal";

function Header() {
  const [menuClose, setMenuClose] = useState(false);
  const [searchClose, setSearchClose] = useState(false);
  const [cartClose, setCartClose] = useState<boolean>(false);

  return (
    <div className="header-exterior">
      <SectionStructure>
        <header className="header__container">
          <div className="menu-hamburguesa">
            <div className="icono" onClick={() => setMenuClose(!menuClose)}>
              {menuClose ? (
                <IoMdClose className="icon" />
              ) : (
                <CiMenuBurger className="icon" />
              )}
            </div>
          </div>
          <div className="titulo-central">
            <Link href="/" className="title-header">
              CHROMA
            </Link>
          </div>
          <div className="busqueda-usuario-cart">
            <div className="icono" onClick={() => setSearchClose(!searchClose)}>
              {searchClose ? (
                <IoMdClose className="icon" />
              ) : (
                <HiMagnifyingGlass className="icon" />
              )}
            </div>
            <Link href="/customer/account/login" className="icono icono-user">
              <CiUser className="icon" />
            </Link>
            <div className="icono" onClick={() => setCartClose(!cartClose)}>
              <CiShoppingCart className="icon" />
            </div>
          </div>
        </header>
      </SectionStructure>
      {menuClose && <MenuBurguer />}
      {searchClose && <Search />}
      {cartClose && <Modal close={() => setCartClose(false)} />}
    </div>
  );
}

export default Header;
