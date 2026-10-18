import type { HTMLAttributes, ReactNode } from 'react'

export type VarianteAviso = 'sucesso' | 'erro' | 'informacao'

export interface PropriedadesAviso
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  children: ReactNode
  titulo?: string
  variante: VarianteAviso
}

export function Aviso({
  children,
  className = '',
  titulo,
  variante,
  ...propriedades
}: PropriedadesAviso) {
  const classes = ['aviso', `aviso--${variante}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role={variante === 'erro' ? 'alert' : 'status'}
      {...propriedades}
    >
      {titulo && <strong className="aviso__titulo">{titulo}</strong>}
      <div>{children}</div>
    </div>
  )
}
