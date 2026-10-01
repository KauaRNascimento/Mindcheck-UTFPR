import { InputHTMLAttributes, TextareaHTMLAttributes, useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

interface FieldChromeProps {
  label: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

/** Envolve label + texto auxiliar + erro, associando tudo via aria-describedby/htmlFor. */
function useFieldA11y({ label, helperText, errorMessage, required }: FieldChromeProps, providedId?: string) {
  const autoId = useId();
  const id = providedId || autoId;
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
  return { id, helperId, errorId, describedBy, label, helperText, errorMessage, required };
}

function FieldLabel({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id}>
      {label}
      {required && (
        <span aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function FieldFooter({
  helperId,
  helperText,
  errorId,
  errorMessage,
}: {
  helperId?: string;
  helperText?: string;
  errorId?: string;
  errorMessage?: string;
}) {
  return (
    <>
      {helperText && !errorMessage && (
        <p id={helperId}>
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id">, FieldChromeProps {
  id?: string;
}

export function Input({ label, helperText, errorMessage, required, id, className, ...rest }: InputProps) {
  const a11y = useFieldA11y({ label, helperText, errorMessage, required }, id);
  return (
    <div data-component="field">
      <FieldLabel id={a11y.id} label={label} required={required} />
      <input
        id={a11y.id}
        className={className}
        aria-invalid={Boolean(errorMessage) || undefined}
        aria-describedby={a11y.describedBy}
        aria-required={required || undefined}
        {...rest}
      />
      <FieldFooter helperId={a11y.helperId} helperText={helperText} errorId={a11y.errorId} errorMessage={errorMessage} />
    </div>
  );
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">, FieldChromeProps {
  id?: string;
}

export function Textarea({ label, helperText, errorMessage, required, id, className, rows = 4, ...rest }: TextareaProps) {
  const a11y = useFieldA11y({ label, helperText, errorMessage, required }, id);
  return (
    <div data-component="field">
      <FieldLabel id={a11y.id} label={label} required={required} />
      <textarea
        id={a11y.id}
        rows={rows}
        className={className}
        aria-invalid={Boolean(errorMessage) || undefined}
        aria-describedby={a11y.describedBy}
        aria-required={required || undefined}
        {...rest}
      />
      <FieldFooter helperId={a11y.helperId} helperText={helperText} errorId={a11y.errorId} errorMessage={errorMessage} />
    </div>
  );
}

export interface CheckboxProps {
  id?: string;
  label: string;
  helperText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
}

/** Checkbox (Radix) com área de toque de 44px, incluindo a faixa de texto (não só o quadrado). */
export function Checkbox({ label, helperText, id, checked, defaultChecked, disabled, required, onCheckedChange, name, value }: CheckboxProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  return (
    <div data-component="checkbox">
      <div data-component="selection-row">
        <CheckboxPrimitive.Root
          id={inputId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          onCheckedChange={onCheckedChange}
          name={name}
          value={value}
          aria-describedby={helperId}
        >
          <CheckboxPrimitive.Indicator>✓</CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label htmlFor={inputId}>
          {label}
        </label>
      </div>
      {helperText && (
        <p id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
}

/**
 * Grupo de opção única com Radix RadioGroup (role="radiogroup", navegação por seta, aria-checked
 * já resolvidos pelo primitivo), envolvido em <fieldset>/<legend> para reforçar a semântica nativa.
 */
export function RadioGroup({ name, legend, options, value, onChange, errorMessage, required }: RadioGroupProps) {
  const groupId = useId();
  const errorId = errorMessage ? `${groupId}-error` : undefined;
  return (
    <fieldset data-component="radio-group" aria-describedby={errorId}>
      <legend>
        {legend}
        {required && (
          <span aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </legend>
      <RadioGroupPrimitive.Root name={name} value={value} onValueChange={onChange} required={required}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <div key={option.value} data-component="selection-row">
              <RadioGroupPrimitive.Item value={option.value} id={optionId}>
                <RadioGroupPrimitive.Indicator />
              </RadioGroupPrimitive.Item>
              <label htmlFor={optionId}>
                {option.label}
              </label>
            </div>
          );
        })}
      </RadioGroupPrimitive.Root>
      {errorMessage && (
        <p id={errorId} role="alert">
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
}
