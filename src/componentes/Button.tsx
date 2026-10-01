import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão. @default "primary" */
  variant?: ButtonVariant;
  /** Tamanho do botão. @default "md" */
  size?: ButtonSize;
  /** Mostra spinner e desabilita interação, mantendo o texto legível para leitor de tela. */
  loading?: boolean;
  /** Ocupa 100% da largura do container (comum em telas mobile). */
  fullWidth?: boolean;
  /** Ícone opcional antes do texto. */
  iconLeft?: ReactNode;
  /** Ícone opcional depois do texto. */
  iconRight?: ReactNode;
  children: ReactNode;
}

/**
 * Botão de ação padrão do Mindcheck.
 * Área de toque nunca menor que 44px (--tap-target-min), mesmo em variantes compactas.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        data-component="button"
        className={className}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading && <span aria-hidden="true" />}
        <span>
          {!loading && iconLeft}
          {children}
          {!loading && iconRight}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Obrigatório: o botão só tem ícone, então o rótulo acessível não pode faltar. */
  "aria-label": string;
  icon: ReactNode;
}

/** Botão só-ícone. Sempre exige aria-label pois não há texto visível para leitor de tela. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "md", loading = false, icon, disabled, className, ...rest }, ref) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        data-component="icon-button"
        className={className}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading ? <span aria-hidden="true" /> : icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
