import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface PropriedadesAreaTexto
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalida?: boolean
}

export const AreaTexto = forwardRef<
  HTMLTextAreaElement,
  PropriedadesAreaTexto
>(function AreaTexto(
  { className = '', invalida = false, ...propriedades },
  referencia,
) {
  const classes = [
    'area-texto',
    invalida && 'area-texto--invalida',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <textarea
      aria-invalid={invalida || undefined}
      className={classes}
      ref={referencia}
      {...propriedades}
    />
  )
})
