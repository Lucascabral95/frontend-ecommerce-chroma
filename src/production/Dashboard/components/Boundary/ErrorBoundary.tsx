"use client";
import { Component, ReactNode } from "react";

import "./ErrorBoundary.scss";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to monitoring service (Sentry, LogRocket, etc.)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            error={this.state.error}
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      );
    }

    return this.props.children;
  }
}

// Componente de fallback por defecto para errores
function DefaultErrorFallback({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <h2>¡Algo salió mal!</h2>
        <div className="error-details">
          <p>Ha ocurrido un error inesperado. Por favor, intenta nuevamente.</p>
          {error && (
            <details style={{ marginTop: "1rem" }}>
              <summary>Detalles técnicos</summary>
              <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>
                {error.message}
              </pre>
            </details>
          )}
        </div>
        <div className="error-actions">
          <button onClick={reset} className="retry-button">
            Intentar nuevamente
          </button>
          <button
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Recargar página
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
