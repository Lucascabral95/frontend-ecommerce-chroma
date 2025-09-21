import { ChangeEvent, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import "./Filters.scss";

interface Props {
  search: boolean;
  order: boolean;
  searchName: string;
  setSearchName: (value: string) => void;
  onAddResource: () => void;
  nameResource: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SORT_OPTIONS = {
  "1": { sortBy: "createdAt", sortOrder: "desc" },
  "2": { sortBy: "name", sortOrder: "asc" },
  "3": { sortBy: "name", sortOrder: "desc" },
  "4": { sortBy: "basePrice", sortOrder: "asc" },
  "5": { sortBy: "basePrice", sortOrder: "desc" },
} as const;

function Filters({
  order,
  search,
  searchName,
  setSearchName,
  onAddResource,
  nameResource,
  onKeyDown,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSort = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const config = SORT_OPTIONS[e.target.value as keyof typeof SORT_OPTIONS];

      if (config) {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", config.sortBy);
        params.set("sortOrder", config.sortOrder);

        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="filters-of-dashboard">
      <div className="filters-of-dashboard__container">
        <div className="add-resource">
          <button onClick={onAddResource}> Agregar {nameResource} </button>
        </div>
        <div className="ins">
          {search && (
            <div className="search-incognito">
              <div className="div-input">
                <label htmlFor="">Buscar</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Buscar..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={onKeyDown}
                />
              </div>
            </div>
          )}
          {order && (
            <div className="order">
              <div className="text-order">
                <p> Ordenar </p>
              </div>
              <div className="button-order">
                <select name="sort" id="sort" onChange={handleSort}>
                  <option value="">Selecciona orden</option>
                  <option value="1">Mas recientes</option>
                  <option value="2">Nombre A - Z</option>
                  <option value="3">Nombre Z - A</option>
                  <option value="4">Menor precio</option>
                  <option value="5">Mayor precio</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
