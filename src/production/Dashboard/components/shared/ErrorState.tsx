import "./StateModesStyle.scss";

interface ErrorStateProps {
  error: Error | string;
  onRetry: () => void;
  title?: string;
  retryLabel?: string;
}

const ErrorState = ({
  error,
  onRetry,
  title = "¡Ups! Algo salió mal",
  retryLabel = "Reintentar",
}: ErrorStateProps) => {
  const errorMessage =
    typeof error === "string" ? error : error.message || "Error desconocido";

  return (
    <section
      className="state-card state-card--error"
      aria-live="assertive"
      role="alert"
    >
      <div className="state-card__visual" aria-hidden="true">
        <span className="state-card__emoji">❌</span>
      </div>

      <h3 className="state-card__title">{title}</h3>

      <p className="state-card__desc">{errorMessage}</p>

      <div className="state-card__actions">
        <button
          className="state-card__btn state-card__btn--danger"
          onClick={onRetry}
          type="button"
        >
          {retryLabel}
        </button>
      </div>
    </section>
  );
};

export default ErrorState;
