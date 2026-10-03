import { ReactNode } from "react";
import { Button } from "./Button";

export interface StatusStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Tela sem conteúdo ainda (ex: nenhum check-in feito). É um convite a agir, não um vazio sem sentido. */
export function EmptyState({ icon, title, description, actionLabel, onAction }: StatusStateProps) {
  return (
    <div data-component="status-state">
      <div aria-hidden="true">
        {icon ?? "＋"}
      </div>
      <p>{title}</p>
      {description && <p>{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/** Algo deu errado ao carregar/enviar. Explica o que aconteceu e oferece uma saída, sem jargão técnico. */
export function ErrorState({ icon, title, description, actionLabel, onAction }: StatusStateProps) {
  return (
    <div data-component="status-state" role="alert">
      <div aria-hidden="true">
        {icon ?? "!"}
      </div>
      <p>{title}</p>
      {description && <p>{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
