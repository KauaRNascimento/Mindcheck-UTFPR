import { Botao } from '../atomos/botao'

export interface PropriedadesEstadoErro {
  aoTentarNovamente?: () => void
  mensagem: string
  textoAcao?: string
  titulo?: string
}

export function EstadoErro({
  aoTentarNovamente,
  mensagem,
  textoAcao = 'Tentar novamente',
  titulo = 'Algo deu errado',
}: PropriedadesEstadoErro) {
  return (
    <div className="estado-erro">
      <div className="aviso aviso--erro" role="alert">
        <strong className="aviso__titulo">{titulo}</strong>
        <div>{mensagem}</div>
      </div>
      {aoTentarNovamente && (
        <Botao onClick={aoTentarNovamente} variante="secundario">
          {textoAcao}
        </Botao>
      )}
    </div>
  )
}
