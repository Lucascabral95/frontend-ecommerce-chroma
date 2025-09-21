import "./StateModesStyle.scss";

function LoadingState({ message = "Cargando..." }: { message?: string }) {
  return (
    <section
      className="state-card state-card--loading"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="state-card__spinner" aria-hidden="true" />
      <p className="state-card__desc">{message}</p>
    </section>
  );
}

export default LoadingState;
