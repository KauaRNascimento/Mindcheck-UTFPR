import { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Torna o card clicável (ex: card de check-in do dia). Renderiza como button semântico. */
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Card({ onClick, padding = "md", children, className, ...rest }: CardProps) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} data-component="card" data-padding={padding} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
  return (
    <div className={className} data-component="card" data-padding={padding} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div data-component="card-header">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
