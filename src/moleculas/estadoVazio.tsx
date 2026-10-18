import { useId, type ReactNode } from 'react'
import { Botao } from '../atomos/botao'

export interface PropriedadesEstadoVazio {
  acao?: () => void
  children: ReactNode
  textoAcao?: string
  titulo: string
}

export function EstadoVazio({
  acao,
  children,
  textoAcao,
  titulo,
}: PropriedadesEstadoVazio) {
  const idTitulo = useId()

  return (
    <section aria-labelledby={idTitulo} className="estado-vazio">
      <h2 id={idTitulo}>{titulo}</h2>
      <p>{children}</p>
      {acao && textoAcao && (
        <Botao onClick={acao} variante="secundario">
          {textoAcao}
        </Botao>
      )}
    </section>
  )
}
