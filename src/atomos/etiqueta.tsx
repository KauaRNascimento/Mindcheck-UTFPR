import type { HTMLAttributes, ReactNode } from 'react'

export type VarianteEtiqueta = 'neutra' | 'sucesso' | 'aviso' | 'erro'

export interface PropriedadesEtiqueta
  extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variante?: VarianteEtiqueta
}

export function Etiqueta({
  children,
  className = '',
  variante = 'neutra',
  ...propriedades
}: PropriedadesEtiqueta) {
  const classes = ['etiqueta', `etiqueta--${variante}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...propriedades}>
      {children}
    </span>
  )
}
