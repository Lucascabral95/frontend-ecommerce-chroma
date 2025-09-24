"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_DURATION = 1800;

interface ToastState {
  message: string;
  error: boolean;
}

const useToast = (duration: number = TOAST_DURATION) => {
  const [toast, setToast] = useState<ToastState>({ message: "", error: false });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (message: string, error = false) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ message, error });

      timeoutRef.current = setTimeout(() => {
        setToast({ message: "", error: false });
        timeoutRef.current = null;
      }, duration);
    },
    [duration]
  );

  const clearToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast({ message: "", error: false });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { toast, showToast, clearToast };
};

export default useToast;
