import "./Filters.scss";

interface Props {
  search: boolean;
  order: boolean;
  searchName: string;
  setSearchName: (value: string) => void;
  onAddResource: () => void;
  nameResource: string;
}

function Filters({
  order,
  search,
  searchName,
  setSearchName,
  onAddResource,
  nameResource,
}: Props) {
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
                />
              </div>
            </div>
          )}
          {order && (
            <div className="order">
              <div className="text-order">
                <p> Ordenar</p>
              </div>
              <div className="button-order">
                <select name="" id="">
                  <option value="">Mas recientes</option>
                  <option value="">Nombre A - Z</option>
                  <option value="">Nombre Z - A</option>
                  <option value="">Menor precio</option>
                  <option value="">Mayor precio</option>
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
