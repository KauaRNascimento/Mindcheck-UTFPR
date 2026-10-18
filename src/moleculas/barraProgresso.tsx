export interface PropriedadesBarraProgresso {
  maximo?: number
  rotulo: string
  valor: number
}

export function BarraProgresso({
  maximo = 100,
  rotulo,
  valor,
}: PropriedadesBarraProgresso) {
  const limite = maximo > 0 ? maximo : 100
  const valorLimitado = Math.min(Math.max(valor, 0), limite)
  const percentual = (valorLimitado / limite) * 100

  return (
    <div
      aria-label={rotulo}
      aria-valuemax={limite}
      aria-valuemin={0}
      aria-valuenow={valorLimitado}
      className="barra-progresso"
      role="progressbar"
    >
      <span
        aria-hidden="true"
        className="barra-progresso__preenchimento"
        style={{ width: `${percentual}%` }}
      />
    </div>
  )
}
