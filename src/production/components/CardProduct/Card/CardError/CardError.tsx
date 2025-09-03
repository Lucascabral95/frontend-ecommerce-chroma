// "use client";
// import React from "react";
// import "./CardError.scss";
// import SectionStructure from "@/production/Section/SectionStructure";

// type Props = {
//   message?: string;
//   statusCode?: number;
//   onRetry?: () => void;
//   onContact?: () => void;
//   supportId?: string;
//   title?: string;
// };

// function CardError({
//   message = "No se pudo cargar la sección en este momento.",
//   statusCode,
//   onRetry,
//   onContact,
//   supportId,
//   title = "Algo salió mal",
// }: Props) {
//   const friendly =
//     statusCode && statusCode >= 500
//       ? "Es un problema temporal del servidor. Intentar de nuevo en unos segundos."
//       : "Revisar la conexión o intentar nuevamente.";

//   return (
//     <SectionStructure>
//       <section className="card-error" aria-live="polite">
//         <div className="card-error__container" role="alert" aria-atomic="true">
//           <div className="card-error__header">
//             <span className="card-error__icon" aria-hidden="true">
//               !
//             </span>
//             <h3 className="card-error__title">{title}</h3>
//           </div>

//           <p className="card-error__message">
//             {message}
//             {statusCode ? ` (Código ${statusCode})` : null}
//           </p>

//           <p className="card-error__hint">{friendly}</p>

//           <div className="card-error__actions">
//             {onRetry && (
//               <button
//                 type="button"
//                 className="btn btn--primary"
//                 onClick={onRetry}
//               >
//                 Reintentar
//               </button>
//             )}

//             {onContact && (
//               <button
//                 type="button"
//                 className="btn btn--ghost"
//                 onClick={onContact}
//                 aria-label="Contactar soporte"
//               >
//                 Contactar soporte
//               </button>
//             )}
//           </div>

//           {supportId && (
//             <div className="card-error__meta">
//               <span className="card-error__badge">ID soporte: {supportId}</span>
//             </div>
//           )}
//         </div>
//       </section>
//     </SectionStructure>
//   );
// }

// export default CardError;

"use client";

import React from "react";
import SectionStructure from "@/production/Section/SectionStructure";
import "./CardError.scss";

// --- Icono de error (sin cambios) ---
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="card-error__icon"
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Tipos de Props (versión final y limpia) ---
type Props = {
  /** Título principal de la tarjeta de error. */
  title?: string;
  /** Mensaje principal que describe el error de forma genérica. */
  primaryText?: string;
  /** Mensaje secundario que ofrece una pista o solución. Si no se provee, se genera uno automáticamente. */
  secondaryText?: string;
  /** Código de error (HTTP o interno) para mostrar y generar el hintText. */
  errorCode?: number | string;
  /** ID único para seguimiento en sistemas de soporte. */
  supportId?: string;
  /** Función a ejecutar cuando el usuario presiona el botón de reintentar. */
  onRetry?: () => void;
  /** Texto para el botón de reintentar (preparado para i18n). */
  retryButtonText?: string;
  /** Función a ejecutar cuando el usuario presiona el botón de contacto. */
  onContact?: () => void;
  /** Texto para el botón de contacto (preparado para i18n). */
  contactButtonText?: string;
};

/**
 * Un componente robusto y profesional para mostrar mensajes de error en la UI.
 * Está diseñado para ser claro, útil y visualmente consistente.
 */
function CardError({
  title = "Ha ocurrido un problema",
  primaryText = "Se ha producido un error técnico inesperado.",
  secondaryText,
  errorCode,
  supportId,
  onRetry,
  retryButtonText = "Reintentar",
  onContact,
  contactButtonText = "Contactar a Soporte",
}: Props) {
  // Lógica de hintText mejorada: distingue entre errores de servidor, cliente y genéricos.
  const getHintText = () => {
    if (secondaryText) return secondaryText; // Prioridad al texto manual.

    if (typeof errorCode === "number") {
      if (errorCode >= 500) {
        return "Nuestros sistemas están experimentando una interrupción temporal. Por favor, inténtalo de nuevo en unos minutos.";
      }
      if (errorCode >= 400) {
        return "No se pudo procesar tu solicitud. Verifica los datos o contacta a soporte si el problema persiste.";
      }
    }

    return "Revisa tu conexión a internet o intenta recargar la página.";
  };

  const hintText = getHintText();

  return (
    <SectionStructure>
      <section
        className="card-error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="card-error__container">
          <div className="card-error__header">
            <ErrorIcon />
            <h3 className="card-error__title">{title}</h3>
          </div>

          <div className="card-error__body">
            <p className="card-error__message">
              {primaryText}
              {errorCode && ` (Código: ${errorCode})`}
            </p>
            <p className="card-error__hint">{hintText}</p>
          </div>

          {(onRetry || onContact) && (
            <div className="card-error__actions">
              {onRetry && (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={onRetry}
                >
                  {retryButtonText}
                </button>
              )}
              {onContact && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={onContact}
                >
                  {contactButtonText}
                </button>
              )}
            </div>
          )}

          {supportId && (
            <div className="card-error__meta">
              <span className="card-error__badge">
                ID de Soporte: {supportId}
              </span>
            </div>
          )}
        </div>
      </section>
    </SectionStructure>
  );
}

export default CardError;
