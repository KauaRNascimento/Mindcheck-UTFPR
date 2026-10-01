import { ReactNode } from "react";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "error";

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

/** Etiqueta curta de status (ex: "Respondido", "Pendente", "Atenção"). Não usar para ações. */
export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <span data-tone={tone}>{children}</span>;
}
