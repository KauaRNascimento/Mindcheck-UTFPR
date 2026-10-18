import type { HTMLAttributes, ReactNode } from 'react'

export interface PropriedadesCabecalhoCartao {
  descricao?: string
  titulo: string
}

export function CabecalhoCartao({
  descricao,
  titulo,
}: PropriedadesCabecalhoCartao) {
  return (
    <header className="cartao__cabecalho">
      <h2 className="cartao__titulo">{titulo}</h2>
      {descricao && <p className="cartao__descricao">{descricao}</p>}
    </header>
  )
}

export interface PropriedadesCartao extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export function Cartao({
  children,
  className = '',
  ...propriedades
}: PropriedadesCartao) {
  const classes = ['cartao', className].filter(Boolean).join(' ')

  return (
    <article className={classes} {...propriedades}>
      {children}
    </article>
  )
}
