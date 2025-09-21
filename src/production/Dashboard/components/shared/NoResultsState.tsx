import "./StateModesStyle.scss";

interface NoResultsStateProps {
  searchTerm: string;
  onClear: () => void;
}

const NoResultsState = ({ searchTerm, onClear }: NoResultsStateProps) => (
  <section
    className="state-card state-card--neutral"
    aria-live="polite"
    role="status"
  >
    <div className="state-card__visual" aria-hidden="true">
      <span className="state-card__emoji">🔍</span>
    </div>

    <h3 className="state-card__title">No se encontraron resultados</h3>

    <p className="state-card__desc">
      No hay coincidencias para:{" "}
      <span className="state-card__highlight">{searchTerm}</span>
    </p>

    <div className="state-card__actions">
      <button
        className="state-card__btn state-card__btn--primary"
        onClick={onClear}
        type="button"
      >
        Limpiar búsqueda
      </button>
    </div>
  </section>
);

export default NoResultsState;
