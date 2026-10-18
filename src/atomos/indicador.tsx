export interface PropriedadesIndicador {
  decorativo?: boolean
  rotulo?: string
  tamanho?: 'pequeno' | 'medio' | 'grande'
}

export function Indicador({
  decorativo = false,
  rotulo = 'Carregando',
  tamanho = 'medio',
}: PropriedadesIndicador) {
  return (
    <span
      aria-label={decorativo ? undefined : rotulo}
      aria-hidden={decorativo || undefined}
      className={`indicador indicador--${tamanho}`}
      role={decorativo ? undefined : 'status'}
    >
      <span aria-hidden="true" className="indicador__circulo" />
    </span>
  )
}
