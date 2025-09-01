import React from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";

import "./Search.scss";

function Search() {
  return (
    <div className="search">
      <div className="search__container">
        <div className="search-inside">
          <div className="input-search">
            <input type="text" placeholder="¿Qué estás buscando?" />
          </div>
          <div className="icono">
            <HiMagnifyingGlass className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
