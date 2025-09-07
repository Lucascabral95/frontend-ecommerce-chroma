"use client";
import React, { useState } from "react";

import Link from "next/link";

import SectionStructure from "../Section/SectionStructure";
import { CiMenuBurger, CiShoppingCart, CiUser } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import MenuBurguer from "./components/MenuBurguer";
import Search from "./components/Search";
import Modal from "../Cart/Modal/Modal";
import { useRouter, usePathname } from "next/navigation";

import "./Header.scss";
import useAuthStore from "@/lib/zustand/AuthZustand";
import { useCartStore } from "@/lib/zustand/CartZustand";

function Header() {
  const [menuClose, setMenuClose] = useState(false);
  const [searchClose, setSearchClose] = useState(false);
  const [cartClose, setCartClose] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  const { userDataSession } = useAuthStore();
  const { cart } = useCartStore();

  const handleCart = () => {
    if (pathName === "/checkout/cart") {
      setCartClose(!cartClose);
    } else {
      router.push("/checkout/cart");
    }
  };

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
            <Link
              href={
                userDataSession
                  ? "/customer/account/profile"
                  : "/customer/account/login"
              }
              className="icono icono-user"
            >
              <CiUser className="icon" />
            </Link>
            <div className="icono" onClick={() => handleCart()}>
              <CiShoppingCart className="icon" />
              {cart?.items?.length ||
                (0 > 0 && (
                  <span className="cart-count">{cart?.items?.length || 0}</span>
                ))}
            </div>
          </div>
        </header>
      </SectionStructure>
      {menuClose && <MenuBurguer close={() => setMenuClose(false)} />}
      {searchClose && <Search />}
      {cartClose && <Modal close={() => setCartClose(false)} />}
    </div>
  );
}

export default Header;
