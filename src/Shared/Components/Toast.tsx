import "./Toast.scss";

interface ToastProps {
  message: string;
  error?: boolean;
}

function Toast({ message, error = false }: ToastProps) {
  return (
    <div className="toast">
      <div
        className="toast__container"
        style={{
          backgroundColor: error ? "#FFEBEE" : "#E8F5E9",
          color: error ? "#D32F2F" : "#2E7D32",
        }}
      >
        <p className={error ? "text-error" : "text-success"}> {message} </p>
      </div>
    </div>
  );
}

export default Toast;
