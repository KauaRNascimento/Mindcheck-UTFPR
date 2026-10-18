import { forwardRef, type InputHTMLAttributes } from 'react'

export type PropriedadesSelecaoUnica =
  InputHTMLAttributes<HTMLInputElement>

export const SelecaoUnica = forwardRef<
  HTMLInputElement,
  PropriedadesSelecaoUnica
>(function SelecaoUnica({ className = '', ...propriedades }, referencia) {
  const classes = ['selecao-unica', className].filter(Boolean).join(' ')

  return (
    <input
      className={classes}
      ref={referencia}
      type="radio"
      {...propriedades}
    />
  )
})
