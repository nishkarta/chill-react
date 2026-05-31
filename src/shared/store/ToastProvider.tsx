// ToastProvider.tsx
import type { InternalToast } from "@shared/store/toast.store";
import Toast from "@shared/ui/Toast";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ToastContextValue {
  show: (props: Omit<InternalToast, "id" | "isOpen">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let externalShow: ToastContextValue["show"] | null = null;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<InternalToast[]>([]);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const show = useCallback(
    (props: Omit<InternalToast, "id" | "isOpen">) => {
      const id = crypto.randomUUID();

      const toast: InternalToast = {
        id,
        isOpen: true,
        ...props,
        onClose: () => remove(id),
      };

      setToasts((prev) => [...prev, toast]);
    },
    []
  );


  useEffect(() => {
    externalShow = show;

    return () => {
      externalShow = null;
    };
  }, [show])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {createPortal(
        <>
          {toasts.map((t) => (
            <Toast key={t.id} {...t} />
          ))}
        </>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const toast = {
  success: (text: string, duration?: number) =>
    externalShow?.({ text, duration, status: "success" }),

  error: (text: string, duration?: number) =>
    externalShow?.({ text, duration, status: "failed" }),

  warning: (text: string, duration?: number) =>
    externalShow?.({
      text,
      duration,
      status: "failed", // or create new style if needed
      icon: "danger-triangle",
    }),
};