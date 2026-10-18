import { forwardRef, type InputHTMLAttributes } from 'react'

export type PropriedadesCaixaSelecao =
  InputHTMLAttributes<HTMLInputElement>

export const CaixaSelecao = forwardRef<
  HTMLInputElement,
  PropriedadesCaixaSelecao
>(function CaixaSelecao({ className = '', ...propriedades }, referencia) {
  const classes = ['caixa-selecao', className].filter(Boolean).join(' ')

  return (
    <input
      className={classes}
      ref={referencia}
      type="checkbox"
      {...propriedades}
    />
  )
})
