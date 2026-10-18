import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type VarianteBotao = 'primario' | 'secundario' | 'discreto' | 'perigo'

export interface PropriedadesBotao
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  carregando?: boolean
  larguraTotal?: boolean
  variante?: VarianteBotao
}

export function Botao({
  carregando = false,
  children,
  className = '',
  disabled = false,
  larguraTotal = false,
  type = 'button',
  variante = 'primario',
  ...propriedades
}: PropriedadesBotao) {
  const classes = [
    'botao',
    `botao--${variante}`,
    larguraTotal && 'botao--largura-total',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      aria-busy={carregando || undefined}
      className={classes}
      disabled={disabled || carregando}
      type={type}
      {...propriedades}
    >
      {carregando && <span aria-hidden="true" className="botao__indicador" />}
      {children}
    </button>
  )
}

export interface PropriedadesBotaoIcone
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icone: ReactNode
  rotuloAcessivel: string
}

export function BotaoIcone({
  className = '',
  icone,
  rotuloAcessivel,
  ...propriedades
}: PropriedadesBotaoIcone) {
  const classes = ['botao-icone', className].filter(Boolean).join(' ')

  return (
    <button
      aria-label={rotuloAcessivel}
      className={classes}
      type="button"
      {...propriedades}
    >
      {icone}
    </button>
  )
}
