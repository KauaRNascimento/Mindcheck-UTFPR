import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Botao, BotaoIcone } from './atomos/botao'
import { CaixaSelecao } from './atomos/caixaSelecao'
import { CampoTexto } from './atomos/campoTexto'
import { AreaTexto } from './atomos/areaTexto'
import { Indicador } from './atomos/indicador'
import { SelecaoUnica } from './atomos/selecaoUnica'
import { Etiqueta } from './atomos/etiqueta'
import { BarraProgresso } from './moleculas/barraProgresso'
import { Cartao, CabecalhoCartao } from './moleculas/cartao'
import { CampoFormulario } from './moleculas/campoFormulario'
import { EstadoErro } from './moleculas/estadoErro'
import { EstadoVazio } from './moleculas/estadoVazio'
import { Modal } from './organismos/dialogo'
import { AvisoFlutuante } from './organismos/avisoFlutuante'

describe('componentes atomicos', () => {
  it('renderiza botao acessivel e bloqueado durante carregamento', () => {
    render(<Botao carregando>Salvar</Botao>)

    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
  })

  it('nomeia botao de icone com uma descricao acessivel', () => {
    render(<BotaoIcone rotuloAcessivel="Fechar" icone="x" />)

    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument()
  })

  it('renderiza etiqueta, indicador e controles de formulario nativos', () => {
    render(
      <>
        <Etiqueta variante="sucesso">Concluído</Etiqueta>
        <Indicador rotulo="Salvando" />
        <CampoTexto aria-label="Nome" />
        <AreaTexto aria-label="Observação" />
        <CaixaSelecao aria-label="Aceitar termos" />
        <SelecaoUnica aria-label="Opção A" name="opcao" />
      </>,
    )

    expect(screen.getByText('Concluído')).toHaveClass('etiqueta--sucesso')
    expect(screen.getByRole('status', { name: 'Salvando' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Observação' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Aceitar termos' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Opção A' })).toBeInTheDocument()
  })

  it('liga rotulo, campo, ajuda e erro no campo de formulario', () => {
    render(
      <CampoFormulario
        id="email"
        mensagemErro="Informe um endereço válido."
        obrigatorio
        rotulo="E-mail"
        textoAjuda="Usaremos este endereço para contato."
      >
        <CampoTexto required />
      </CampoFormulario>,
    )

    const campo = screen.getByRole('textbox', { name: 'E-mail' })
    expect(campo).toBeRequired()
    expect(campo).toHaveAttribute('aria-invalid', 'true')
    expect(campo).toHaveAttribute(
      'aria-describedby',
      'email-ajuda email-erro',
    )
  })

  it('compõe cabeçalho e conteúdo do cartão', () => {
    render(
      <Cartao>
        <CabecalhoCartao descricao="Dados recentes" titulo="Resumo" />
        <p>Conteúdo do cartão</p>
      </Cartao>,
    )

    expect(screen.getByRole('heading', { name: 'Resumo' })).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do cartão')).toBeInTheDocument()
  })

  it('expõe progresso com valor limitado ao intervalo', () => {
    render(<BarraProgresso rotulo="Etapa" valor={120} maximo={100} />)

    expect(screen.getByRole('progressbar', { name: 'Etapa' })).toHaveAttribute(
      'aria-valuenow',
      '100',
    )
  })

  it('permite tentar novamente a partir do estado de erro', () => {
    const aoTentarNovamente = vi.fn()
    render(
      <EstadoErro
        aoTentarNovamente={aoTentarNovamente}
        mensagem="Falha de conexão."
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(aoTentarNovamente).toHaveBeenCalledOnce()
  })

  it('exibe ação opcional no estado vazio', () => {
    const acao = vi.fn()
    render(
      <EstadoVazio acao={acao} textoAcao="Adicionar" titulo="Sem registros">
        Adicione o primeiro registro.
      </EstadoVazio>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }))
    expect(acao).toHaveBeenCalledOnce()
  })

  it('mantém aviso flutuante oculto e permite dispensá-lo', () => {
    const aoFechar = vi.fn()
    const { rerender } = render(
      <AvisoFlutuante
        aoFechar={aoFechar}
        mensagem="Salvo"
        visivel={false}
      />,
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    rerender(
      <AvisoFlutuante aoFechar={aoFechar} mensagem="Salvo" visivel />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Dispensar aviso' }))
    expect(aoFechar).toHaveBeenCalledOnce()
  })

  it('abre modal sem depender de suporte nativo do ambiente de teste', () => {
    const definicaoMostrar = Object.getOwnPropertyDescriptor(
      HTMLDialogElement.prototype,
      'showModal',
    )
    const mostrarModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    })
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: mostrarModal,
    })

    try {
      render(
        <Modal aberto aoFechar={vi.fn()} titulo="Confirmação">
          Deseja continuar?
        </Modal>,
      )

      expect(mostrarModal).toHaveBeenCalledOnce()
      expect(
        screen.getByRole('dialog', { name: 'Confirmação' }),
      ).toBeInTheDocument()
    } finally {
      if (definicaoMostrar) {
        Object.defineProperty(
          HTMLDialogElement.prototype,
          'showModal',
          definicaoMostrar,
        )
      } else {
        Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
      }
    }
  })
})

afterEach(cleanup)
