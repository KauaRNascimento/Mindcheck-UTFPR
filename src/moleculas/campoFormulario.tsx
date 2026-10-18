import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from 'react'

interface PropriedadesAcessibilidadeCampo {
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  id?: string
}

export interface PropriedadesCampoFormulario {
  children: ReactNode
  id: string
  mensagemErro?: string
  obrigatorio?: boolean
  rotulo: ReactNode
  textoAjuda?: string
}

export function CampoFormulario({
  children,
  id,
  mensagemErro,
  obrigatorio = false,
  rotulo,
  textoAjuda,
}: PropriedadesCampoFormulario) {
  const idAjuda = textoAjuda ? `${id}-ajuda` : undefined
  const idErro = mensagemErro ? `${id}-erro` : undefined
  const campoDescrito = Children.map(children, (filho) => {
    if (!isValidElement<PropriedadesAcessibilidadeCampo>(filho)) return filho

    const descricoes = [
      filho.props['aria-describedby'],
      idAjuda,
      idErro,
    ]
      .filter(Boolean)
      .join(' ')

    return cloneElement(filho, {
      'aria-describedby': descricoes || undefined,
      'aria-invalid':
        mensagemErro !== undefined || filho.props['aria-invalid'],
      id: filho.props.id ?? id,
    })
  })
  const classesRotulo = [
    'campo-formulario__rotulo',
    obrigatorio && 'campo-formulario__rotulo--obrigatorio',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="campo-formulario">
      <label className={classesRotulo} htmlFor={id}>
        {rotulo}
        {obrigatorio && (
          <span aria-hidden="true" className="campo-formulario__asterisco">
            {' '}
            *
          </span>
        )}
      </label>
      {campoDescrito}
      {textoAjuda && (
        <span className="campo-formulario__ajuda" id={idAjuda}>
          {textoAjuda}
        </span>
      )}
      {mensagemErro && (
        <span className="campo-formulario__erro" id={idErro}>
          {mensagemErro}
        </span>
      )}
    </div>
  )
}
