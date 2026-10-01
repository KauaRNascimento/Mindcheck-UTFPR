import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconButton } from "./Button";

export interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "modal" | "drawer";
  footer?: ReactNode;
}

/**
 * Base compartilhada por Modal e Drawer, em cima do Radix Dialog: trap de foco,
 * fechar com Escape, clique fora e devolução do foco já vêm do primitivo.
 * Só decidimos aparência (centralizado x painel na base) via CSS.
 */
function OverlayBase({ open, onClose, title, children, variant = "modal", footer }: OverlayProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay data-component="overlay-backdrop" />
        <Dialog.Content data-component="overlay" data-variant={variant}>
          <div>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <IconButton aria-label="Fechar" variant="ghost" size="sm" icon={<span aria-hidden="true">✕</span>} />
            </Dialog.Close>
          </div>
          <div>{children}</div>
          {footer && <div>{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Modal(props: Omit<OverlayProps, "variant">) {
  return <OverlayBase {...props} variant="modal" />;
}

export function Drawer(props: Omit<OverlayProps, "variant">) {
  return <OverlayBase {...props} variant="drawer" />;
}
