import React from "react";

import Link from "next/link";
import MenuBurguerMobile from "./MenuBurguerMobile";
import categories from "@/lib/Categories";

import "./MenuBurguer.scss";

interface Props {
  close: () => void;
}

function MenuBurguer({ close }: Props) {
  const sections = categories;

  return (
    <>
      <div className="men-bur">
        <div className="menu-burguer">
          <div className="menu-burguer__container">
            <ul>
              {sections.map((item, index) => {
                return (
                  <li key={index} onClick={() => close()}>
                    <Link href={item.url}> {item.name} </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <MenuBurguerMobile close={() => close()} />
    </>
  );
}

export default MenuBurguer;
