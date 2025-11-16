import { cn } from '../lib/utils';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  autocomplete?: string;
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export class Input {
  private element: HTMLInputElement;
  private props: InputProps;

  constructor(props: InputProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLInputElement {
    const input = document.createElement('input');
    
    const baseClasses = 'flex h-9 w-full rounded-[var(--radius)] border border-[var(--input)] bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
    
    input.className = cn(baseClasses, this.props.className);
    input.type = this.props.type || 'text';
    
    if (this.props.placeholder) input.placeholder = this.props.placeholder;
    if (this.props.value !== undefined) input.value = this.props.value;
    if (this.props.defaultValue) input.defaultValue = this.props.defaultValue;
    if (this.props.disabled) input.disabled = true;
    if (this.props.readOnly) input.readOnly = true;
    if (this.props.required) input.required = true;
    if (this.props.id) input.id = this.props.id;
    if (this.props.name) input.name = this.props.name;
    if (this.props.min !== undefined) input.min = String(this.props.min);
    if (this.props.max !== undefined) input.max = String(this.props.max);
    if (this.props.step !== undefined) input.step = String(this.props.step);
    if (this.props.pattern) input.pattern = this.props.pattern;
    if (this.props.autocomplete) input.setAttribute('autocomplete', this.props.autocomplete);
    
    if (this.props.onInput) input.addEventListener('input', this.props.onInput);
    if (this.props.onChange) input.addEventListener('change', this.props.onChange);
    if (this.props.onFocus) input.addEventListener('focus', this.props.onFocus);
    if (this.props.onBlur) input.addEventListener('blur', this.props.onBlur);
    if (this.props.onKeyDown) input.addEventListener('keydown', this.props.onKeyDown);
    
    return input;
  }

  getElement(): HTMLInputElement {
    return this.element;
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  focus(): void {
    this.element.focus();
  }

  blur(): void {
    this.element.blur();
  }

  update(props: Partial<InputProps>): void {
    this.props = { ...this.props, ...props };
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  destroy(): void {
    if (this.props.onInput) this.element.removeEventListener('input', this.props.onInput);
    if (this.props.onChange) this.element.removeEventListener('change', this.props.onChange);
    if (this.props.onFocus) this.element.removeEventListener('focus', this.props.onFocus);
    if (this.props.onBlur) this.element.removeEventListener('blur', this.props.onBlur);
    if (this.props.onKeyDown) this.element.removeEventListener('keydown', this.props.onKeyDown);
    this.element.remove();
  }
}

export function createInput(props: InputProps = {}): Input {
  return new Input(props);
}
