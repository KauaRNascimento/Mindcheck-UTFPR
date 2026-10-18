import { useEffect, useId, useRef, type ReactNode } from 'react'
import { BotaoIcone } from '../atomos/botao'

export interface PropriedadesDialogo {
  aberto: boolean
  aoFechar: () => void
  children: ReactNode
  classe?: string
  titulo: string
}

function DialogoBase({
  aberto,
  aoFechar,
  children,
  classe,
  titulo,
}: PropriedadesDialogo) {
  const referenciaDialogo = useRef<HTMLDialogElement>(null)
  const fechamentoControlado = useRef(false)
  const idTitulo = useId()

  useEffect(() => {
    const dialogo = referenciaDialogo.current

    if (!dialogo) return
    if (aberto && !dialogo.open) dialogo.showModal()
    if (!aberto && dialogo.open) {
      fechamentoControlado.current = true
      dialogo.close()
    }
  }, [aberto])

  return (
    <dialog
      aria-labelledby={idTitulo}
      className={['dialogo', classe].filter(Boolean).join(' ')}
      onCancel={(evento) => {
        evento.preventDefault()
        aoFechar()
      }}
      onClose={() => {
        if (fechamentoControlado.current) {
          fechamentoControlado.current = false
          return
        }

        aoFechar()
      }}
      ref={referenciaDialogo}
    >
      <header className="dialogo__cabecalho">
        <h2 id={idTitulo}>{titulo}</h2>
        <BotaoIcone
          rotuloAcessivel="Fechar janela"
          icone={
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
            >
              <path
                d="m5 5 10 10M15 5 5 15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          }
          onClick={() => referenciaDialogo.current?.close()}
        />
      </header>
      <div className="dialogo__conteudo">{children}</div>
    </dialog>
  )
}

export function Modal(propriedades: PropriedadesDialogo) {
  return <DialogoBase {...propriedades} classe="dialogo--modal" />
}

export function Gaveta(propriedades: PropriedadesDialogo) {
  return <DialogoBase {...propriedades} classe="dialogo--gaveta" />
}
