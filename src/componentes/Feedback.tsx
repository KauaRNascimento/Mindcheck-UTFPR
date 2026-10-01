import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

export type FeedbackTone = "success" | "error" | "warning" | "info";

/* ---------- Alert: banner persistente embutido na tela ---------- */

export interface AlertProps {
  tone?: FeedbackTone;
  title: string;
  description?: string;
  onDismiss?: () => void;
}

/** Usar para avisos que ficam na tela até a pessoa agir (ex: "Este resultado não é um diagnóstico"). */
export function Alert({ tone = "info", title, description, onDismiss }: AlertProps) {
  const isUrgent = tone === "error" || tone === "warning";
  return (
    <div data-component="alert" data-tone={tone} role={isUrgent ? "alert" : "status"}>
      <span aria-hidden="true">
        {toneIcon(tone)}
      </span>
      <div>
        <p>{title}</p>
        {description && <p>{description}</p>}
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dispensar aviso">
          ✕
        </button>
      )}
    </div>
  );
}

function toneIcon(tone: FeedbackTone) {
  switch (tone) {
    case "success":
      return "✓";
    case "error":
      return "!";
    case "warning":
      return "⚠";
    default:
      return "ⓘ";
  }
}

/* ---------- Toast: mensagem efêmera disparada por código ---------- */

interface ToastItem {
  id: number;
  tone: FeedbackTone;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, tone?: FeedbackTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast precisa estar dentro de <ToastProvider>");
  return ctx;
}

/** Provider baseado no Radix Toast: fila, aria-live, empilhamento e swipe-to-dismiss (mobile) de graça. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, tone: FeedbackTone = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, tone, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="down" duration={4000}>
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            data-component="toast"
            data-tone={t.tone}
            onOpenChange={(open) => !open && removeToast(t.id)}
          >
            <span aria-hidden="true">
              {toneIcon(t.tone)}
            </span>
            <ToastPrimitive.Description>{t.message}</ToastPrimitive.Description>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
