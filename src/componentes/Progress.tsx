import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { CSSProperties } from "react";

export interface ProgressBarProps {
  /** Valor atual (ex: pergunta 3 de 10 → value=3, max=10). */
  value: number;
  max: number;
  label: string;
}

/** Indicador de progresso determinístico (Radix) — usar em questionários e fluxos com etapas conhecidas. */
export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div data-component="progress">
      <div>
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <ProgressPrimitive.Root value={value} max={max} aria-label={label}>
        <ProgressPrimitive.Indicator style={{ "--progress": `${percent}%` } as CSSProperties} />
      </ProgressPrimitive.Root>
    </div>
  );
}

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

/** Indicador indeterminado — usar quando não se sabe quanto falta (ex: carregando dashboard). */
export function Spinner({ size = "md", label = "Carregando" }: SpinnerProps) {
  return (
    <div data-component="spinner" data-size={size} role="status" aria-live="polite">
      <span aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
