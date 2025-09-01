import React from "react";
import "./HeaderMobile.scss";
import SectionStructure from "../../Section/SectionStructure";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

interface Props {
  menuClose: boolean;
  setMenuClose: (value: boolean) => void;
  searchClose: boolean;
  setSearchClose: (value: boolean) => void;
  cartClose: boolean;
  setCartClose: (value: boolean) => void;
}

function HeaderMobile({
  menuClose,
  setMenuClose,
  searchClose,
  setSearchClose,
  cartClose,
  setCartClose,
}: Props) {
  return (
    <SectionStructure>
      <div className="header-mobile">
        <div className="header-mobile__container">
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
        </div>
      </div>
    </SectionStructure>
  );
}

export default HeaderMobile;
