import { useEffect } from 'react'
import { BotaoIcone } from '../atomos/botao'

type VarianteAvisoFlutuante = 'sucesso' | 'erro' | 'informacao'

export interface PropriedadesAvisoFlutuante {
  aoFechar: () => void
  mensagem: string
  visivel: boolean
  variante?: VarianteAvisoFlutuante
}

export function AvisoFlutuante({
  aoFechar,
  mensagem,
  variante = 'informacao',
  visivel,
}: PropriedadesAvisoFlutuante) {
  useEffect(() => {
    if (!visivel) return

    const temporizador = window.setTimeout(aoFechar, 5000)

    return () => window.clearTimeout(temporizador)
  }, [aoFechar, visivel])

  if (!visivel) return null

  return (
    <div
      className={`aviso-flutuante aviso-flutuante--${variante}`}
      role={variante === 'erro' ? 'alert' : 'status'}
    >
      <span>{mensagem}</span>
      <BotaoIcone
        rotuloAcessivel="Dispensar aviso"
        icone={
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            viewBox="0 0 20 20"
            width="18"
          >
            <path
              d="m5 5 10 10M15 5 5 15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        }
        onClick={aoFechar}
      />
    </div>
  )
}
