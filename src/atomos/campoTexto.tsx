import { forwardRef, type InputHTMLAttributes } from 'react'

export interface PropriedadesCampoTexto
  extends InputHTMLAttributes<HTMLInputElement> {
  invalido?: boolean
}

export const CampoTexto = forwardRef<
  HTMLInputElement,
  PropriedadesCampoTexto
>(function CampoTexto(
  { className = '', invalido = false, ...propriedades },
  referencia,
) {
  const classes = [
    'campo-texto',
    invalido && 'campo-texto--invalido',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <input
      aria-invalid={invalido || undefined}
      className={classes}
      ref={referencia}
      {...propriedades}
    />
  )
})
