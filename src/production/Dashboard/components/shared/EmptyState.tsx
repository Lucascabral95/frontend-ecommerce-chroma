import "./StateModesStyle.scss";

interface EmptyStateProps {
  onAdd: () => void;
  title?: string;
  buttonText?: string;
  description?: string;
}

const EmptyState = ({
  onAdd,
  title = "No hay elementos",
  buttonText = "Agregar nuevo",
  description = "Comienza agregando tu primer elemento para verlo aquí.",
}: EmptyStateProps) => (
  <section
    className="state-card state-card--empty"
    aria-live="polite"
    role="status"
  >
    <div className="state-card__visual" aria-hidden="true">
      <span className="state-card__emoji">📭</span>
    </div>

    <h3 className="state-card__title">{title}</h3>

    {description && <p className="state-card__desc">{description}</p>}

    <div className="state-card__actions">
      <button
        className="state-card__btn state-card__btn--primary"
        onClick={onAdd}
        type="button"
      >
        {buttonText}
      </button>
    </div>
  </section>
);

export default EmptyState;
